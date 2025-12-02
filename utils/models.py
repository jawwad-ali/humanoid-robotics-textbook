from pydantic import BaseModel
from typing import List, Optional


class ChatRequest(BaseModel):
    query: str
    top_k: int = 5
    chapter_slug: Optional[str] = None


class ChatResponse(BaseModel):
    answer: str
    contexts: List[dict]
