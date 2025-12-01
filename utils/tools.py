"""
Agent tools for RAG functionality using OpenAI Agents SDK.
These tools allow the agent to search the book content and answer questions.
"""

from typing import List, Optional, Dict, Any
import logging

from agents import function_tool
from qdrant_client import QdrantClient
from qdrant_client.http import models as rest
import google.generativeai as genai

from app.config import settings


logger = logging.getLogger("rag_backend.agent_tools")


# Global references (initialized in main.py)
_qdrant_client: Optional[QdrantClient] = None


def set_qdrant_client(client: QdrantClient):
    """Set the global Qdrant client instance."""
    global _qdrant_client
    _qdrant_client = client


def embed_text(text: str) -> List[float]:
    """Generate embeddings for text using Gemini."""
    if not text.strip():
        raise ValueError("Cannot embed empty text.")

    res = genai.embed_content(
        model=settings.model_embedding,
        content=text,
        task_type="retrieval_query",
    )
    return res["embedding"]


@function_tool
def search_book_content(
    query: str,
    top_k: int = 5,
    chapter_slug: Optional[str] = None
) -> List[BookContext]:
    """
    Search the Physical AI textbook for relevant content based on a query.

    Args:
        query: The search query or question to find relevant content for
        top_k: Number of top results to return (default: 5)
        chapter_slug: Optional chapter slug to filter results to a specific chapter

    Returns:
        List of relevant text chunks with their metadata (title, heading, text, score)
    """
    if not _qdrant_client:
        raise RuntimeError("Qdrant client not initialized")

    logger.info(f"Searching book content for query: {query}")

    # Generate embedding for the query
    query_embedding = embed_text(query)

    # Build filter if chapter specified
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

    # Search Qdrant
    response = _qdrant_client.query_points(
        collection_name=settings.qdrant_collection,
        query=query_embedding,
        limit=top_k,
        query_filter=search_filter,
        with_payload=True,
        with_vectors=False,
    )

    # Format results
    contexts = []
    for point in response.points:
        payload = point.payload or {}
        contexts.append(BookContext(
            text=payload.get("text", ""),
            title=payload.get("title", ""),
            slug=payload.get("slug", ""),
            heading=payload.get("heading", ""),
            score=float(point.score) if point.score else 0.0,
        ))

    logger.info(f"Found {len(contexts)} relevant chunks")
    return contexts


@function_tool
def format_context_for_answer(contexts: List[BookContext]) -> str:
    """
    Format retrieved contexts into a readable text block for answering questions.

    Args:
        contexts: List of BookContext objects from search_book_content

    Returns:
        Formatted string with all context information
    """
    if not contexts:
        return "No relevant content found in the textbook."

    context_texts = []
    for ctx in contexts:
        section_header = f"[{ctx.title} - {ctx.heading}]"
        context_texts.append(f"{section_header}\n{ctx.text}")

    return "\n\n---\n\n".join(context_texts)