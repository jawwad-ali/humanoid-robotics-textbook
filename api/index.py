from fastapi import FastAPI, HTTPException
from agents import AsyncOpenAI, OpenAIChatCompletionsModel, RunConfig, Agent, Runner
import os
import sys
import logging
from typing import List
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables for local development (optional for Vercel)
try:
    from dotenv import load_dotenv
    load_dotenv(".env")
except ImportError:
    pass  # dotenv not available in production

# Add parent directory to Python path for utils imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.config import init_qdrant, settings
from utils.models import ChatRequest, ChatResponse, AskSelectionRequest, AskSelectionResponse
from utils.helpers import embed_text, search_qdrant, build_rag_prompt, build_selection_prompt

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
app = FastAPI(title="Physical AI Textbook RAG API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*" 
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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

print("[OK] OpenAI connection and LLM model initialized successfully!")


# ---------------------------
# Startup Event & Qdrant Client
# ---------------------------

# Global qdrant client (initialized lazily for serverless compatibility)
qdrant = None

def get_qdrant():
    """Get or initialize Qdrant client (serverless-compatible)"""
    global qdrant
    if qdrant is None:
        qdrant = init_qdrant()
        try:
            collection_info = qdrant.get_collection(settings.qdrant_collection)
            logger.info("Collection '%s' has %d points",
                       settings.qdrant_collection,
                       collection_info.points_count)
            logger.info("Vector size: %s", collection_info.config.params.vectors)
        except Exception as e:
            logger.error("Failed to get collection info: %s", e)
    return qdrant

@app.on_event("startup")
def startup_event():
    """Initialize on startup for local development"""
    get_qdrant()
    logger.info("Startup complete.")


# ---------------------------
# Routes
# ---------------------------

@app.get("/health")
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        query_emb = embed_text(req.query)
    except Exception as e:
        logger.exception("Failed to embed query: %s", e)
        raise HTTPException(status_code=500, detail="Embedding failed")

    try:
        # Get qdrant client (initializes if needed for serverless)
        qdrant_client = get_qdrant()
        points = search_qdrant(
            qdrant_client,
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


##### Ask On Selection Endpoint #####

@app.post("/ask-selection", response_model=AskSelectionResponse)
@app.post("/api/ask-selection", response_model=AskSelectionResponse)
def ask_selection(req: AskSelectionRequest):
    """
    Answer contextual questions about user-selected text.

    This endpoint accepts a text selection from the textbook and a question about it,
    then uses the OpenAI Agents SDK to generate a contextual answer.
    """

    # Input validation (redundant with Pydantic but explicit for clarity)
    if len(req.selected_text.strip()) < 5:
        raise HTTPException(status_code=400, detail="Selected text too short (minimum 5 characters)")
    if len(req.selected_text.strip()) > 5000:
        raise HTTPException(status_code=400, detail="Selected text too long (maximum 5000 characters)")
    if len(req.question.strip()) == 0:
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    # Build prompt with selected text as primary context (no RAG for MVP)
    prompt = build_selection_prompt(req.selected_text, req.question)

    try:
        # Create agent with selection-focused instructions
        agent = Agent(
            name="Humanoid Robotics Textbook Assistant",
            instructions=(
                "You are a helpful tutor for a textbook about Physical AI & Humanoid Robotics. "
                "Help students understand selected passages by answering their questions clearly, "
                "accurately, and in a way that builds on the provided text context."
            ),
            model=MODEL_NAME
        )

        # Generate answer
        result = Runner.run_sync(agent, prompt, run_config=run_config)
        answer = result.final_output

    except Exception as e:
        logger.exception("Agent generation failed for ask-selection: %s", e)
        raise HTTPException(
            status_code=500,
            detail="Failed to generate answer. Please try again."
        )

    return AskSelectionResponse(
        answer=answer,
        selected_text=req.selected_text,
        contexts=[],  # Empty for MVP (no RAG)
        metadata={
            "endpoint": "ask-selection",
            "question_length": len(req.question),
            "selection_length": len(req.selected_text)
        }
    )






if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)