from pydantic_settings import BaseSettings
from qdrant_client import QdrantClient
import logging

logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    google_api_key: str
    model_name: str
    qdrant_url: str
    qdrant_api_key: str
    qdrant_collection: str = "physical_ai_book"

    model_embedding: str = "models/text-embedding-004"
    model_chat: str = "models/gemini-2.5-flash"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()


def init_qdrant() -> QdrantClient:
    client = QdrantClient(
        url=settings.qdrant_url,
        api_key=settings.qdrant_api_key,
    )
    logger.info("Connected to Qdrant at %s", settings.qdrant_url)
    return client