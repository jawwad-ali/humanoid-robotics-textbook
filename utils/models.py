from pydantic import BaseModel, Field, validator
from typing import List, Optional


class ChatRequest(BaseModel):
    query: str
    top_k: int = 5
    chapter_slug: Optional[str] = None


class ChatResponse(BaseModel):
    answer: str
    contexts: List[dict]


class AskSelectionRequest(BaseModel):
    """Request model for asking questions about selected text."""
    selected_text: str = Field(
        ...,
        min_length=5,
        max_length=5000,
        description="The text selected by the user from the textbook"
    )
    question: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="The user's question about the selected text"
    )
    chapter_slug: Optional[str] = Field(
        None,
        description="Optional chapter identifier for context"
    )

    @validator('selected_text')
    def validate_selected_text(cls, v):
        """Ensure selected text is meaningful."""
        stripped = v.strip()
        if len(stripped) < 5:
            raise ValueError("Selected text must be at least 5 characters")
        if len(stripped) > 5000:
            raise ValueError("Selected text must be less than 5000 characters")
        return stripped

    @validator('question')
    def validate_question(cls, v):
        """Ensure question is not empty."""
        stripped = v.strip()
        if not stripped:
            raise ValueError("Question cannot be empty")
        return stripped


class AskSelectionResponse(BaseModel):
    """Response model for selection-based questions."""
    answer: str = Field(
        ...,
        description="The AI-generated answer to the user's question"
    )
    selected_text: str = Field(
        ...,
        description="Echo of the selected text for reference"
    )
    contexts: List[dict] = Field(
        default_factory=list,
        description="Additional textbook contexts used"
    )
    metadata: Optional[dict] = Field(
        default=None,
        description="Optional metadata"
    )
