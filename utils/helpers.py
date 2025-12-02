import logging
from typing import List, Optional
from qdrant_client import models as rest
import google.generativeai as genai
from utils.config import settings

logger = logging.getLogger(__name__)


def embed_text(text: str) -> List[float]:
    """Generate embedding for the given text using Google's embedding model."""
    result = genai.embed_content(
        model=settings.model_embedding,
        content=text,
        task_type="retrieval_query"
    )
    embedding = result['embedding']
    logger.info("Generated embedding with dimension: %d", len(embedding))
    return embedding


def search_qdrant(
    qdrant,
    query_embedding: List[float],
    top_k: int = 5,
    chapter_slug: Optional[str] = None,
):
    """Search Qdrant for the most relevant book chunks and return a list of ScoredPoint."""
    search_filter = None
    if chapter_slug:
        search_filter = rest.Filter(
            must=[
                rest.FieldCondition(
                    key="slug",
                    match=rest.MatchValue(value=chapter_slug),
                )
            ]
        )

    response = qdrant.query_points(
        collection_name=settings.qdrant_collection,
        query=query_embedding,
        limit=top_k,
        query_filter=search_filter,
        with_payload=True,
        with_vectors=False,
    )
    
    logger.info("Qdrant query_points raw response type=%s keys=%s",
                type(response), list(response.__dict__.keys()))

    return response.points


def build_rag_prompt(user_query: str, contexts: List[dict]) -> str:
    """Build a RAG prompt with context for the agent."""
    context_texts = []
    for c in contexts:
        context_texts.append(
            f"[{c.get('title', '')} - {c.get('heading', '')}]\n{c.get('text', '')}"
        )

    joined_context = "\n\n---\n\n".join(context_texts)

    prompt = f"""
You are a helpful tutor for a textbook about Physical AI & Humanoid Robotics.

Answer the user's question using ONLY the context below. 
If the answer is not in the context, say you don't see it in the book.

Context:
{joined_context}

Question:
{user_query}

Answer in clear, structured English suitable for a student.
"""
    return prompt.strip()
