from fastapi import FastAPI, HTTPException
from agents import AsyncOpenAI, OpenAIChatCompletionsModel, RunConfig, Agent, Runner
from dotenv import load_dotenv
import os
import logging
from typing import List
import google.generativeai as genai
from utils.config import init_qdrant, settings
from utils.models import ChatRequest, ChatResponse
from utils.helpers import embed_text, search_qdrant, build_rag_prompt

load_dotenv(".env")
logger = logging.getLogger(__name__)

# Environment variables
GEMINI_API_KEY = os.getenv('GOOGLE_API_KEY')
MODEL_NAME = os.getenv('MODEL_NAME')

if GEMINI_API_KEY is None:
    raise ValueError("GEMINI_API_KEY is not set in the environment variables")
if MODEL_NAME is None:
    raise ValueError("MODEL_NAME is not set in the environment variables")

# Configure Google GenAI
genai.configure(api_key=GEMINI_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Initialize OpenAI client for Gemini
external_client = AsyncOpenAI(
    api_key=GEMINI_API_KEY,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

# Initialize LLM Model
llm_model = OpenAIChatCompletionsModel(
    model=MODEL_NAME,
    openai_client=external_client
)

# Create RunConfig
run_config = RunConfig(
    model=llm_model,
    model_provider=external_client,
    tracing_disabled=True
)

print("✅ OpenAI connection and LLM model initialized successfully!")


# ---------------------------
# Startup Event
# ---------------------------

@app.on_event("startup")
def startup_event():
    global qdrant
    qdrant = init_qdrant()
    
    # Check collection info
    try:
        collection_info = qdrant.get_collection(settings.qdrant_collection)
        logger.info("Collection '%s' has %d points", 
                   settings.qdrant_collection, 
                   collection_info.points_count)
        logger.info("Vector size: %s", collection_info.config.params.vectors)
    except Exception as e:
        logger.error("Failed to get collection info: %s", e)
    
    logger.info("Startup complete.")


# ---------------------------
# Routes
# ---------------------------

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        query_emb = embed_text(req.query)
    except Exception as e:
        logger.exception("Failed to embed query: %s", e)
        raise HTTPException(status_code=500, detail="Embedding failed")

    try:
        points = search_qdrant(
            qdrant,
            query_emb,
            top_k=req.top_k,
            chapter_slug=req.chapter_slug,
        )
    except Exception as e:
        logger.exception("Qdrant search failed: %s", e)
        raise HTTPException(status_code=500, detail="Vector search failed")

    # logger.info("Retrieved %d points from Qdrant", len(points))

    contexts: List[dict] = []
    for p in points:
        payload = p.payload or {}
        contexts.append(
            {
                "text": payload.get("text", ""),
                "title": payload.get("title", ""),
                "slug": payload.get("slug", ""),
                "heading": payload.get("heading", ""),
                "score": p.score,
            }
        )

    if not contexts:
        answer = "I could not find anything in the textbook related to that question."
    else:
        prompt = build_rag_prompt(req.query, contexts)
        try:
            # Create an agent with RAG context
            agent = Agent(
                name="Humanoid Robotics Textbook Assistant",
                instructions="You are a helpful tutor for a textbook about Physical AI & Humanoid Robotics. Answer questions using the provided context from the textbook.",
                model=MODEL_NAME
            )
            
            # Use the agent to generate answer with the RAG prompt
            result = Runner.run_sync(agent, prompt, run_config=run_config)
            answer = result.final_output
            
        except Exception as e:
            logger.exception("Agent generation failed: %s", e)
            raise HTTPException(status_code=500, detail="Generation failed")

    return ChatResponse(answer=answer, contexts=contexts)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)