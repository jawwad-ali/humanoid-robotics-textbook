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


def build_selection_prompt(selected_text: str, user_question: str, contexts: List[dict] = None) -> str:
    """
    Build a prompt for answering questions about user-selected text.

    Args:
        selected_text: The text the user selected from the textbook
        user_question: The user's question about the selected text
        contexts: Optional additional contexts from vector search

    Returns:
        Formatted prompt string for the AI agent
    """
    prompt_parts = [
        "You are helping a student understand a specific passage from the Physical AI & Humanoid Robotics textbook.",
        "",
        "SELECTED TEXT:",
        f'"""{selected_text.strip()}"""',
        "",
    ]

    # Optional: Include supplementary contexts if provided
    if contexts and len(contexts) > 0:
        prompt_parts.extend([
            "RELATED TEXTBOOK SECTIONS (for additional context):",
            ""
        ])
        for i, ctx in enumerate(contexts, 1):
            prompt_parts.append(
                f"[Reference {i}: {ctx.get('title', '')} - {ctx.get('heading', '')}]\n{ctx.get('text', '')}\n"
            )
        prompt_parts.append("")

    # Add the question with clear framing
    prompt_parts.extend([
        "STUDENT'S QUESTION:",
        user_question.strip(),
        "",
        "INSTRUCTIONS:",
        "- Answer the question by focusing on the SELECTED TEXT above",
        "- Provide clear, educational explanations suitable for a student",
        "- If the question cannot be fully answered from the selected text, acknowledge what information is missing",
        "- Keep your answer concise but complete"
    ])

    return "\n".join(prompt_parts)
