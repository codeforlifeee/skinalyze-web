from pydantic_settings import BaseSettings
from typing import List, Union
import os

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "SkinAlyze"
    DEBUG: bool = False
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/skinalyze"
    
    # Auth0
    AUTH0_DOMAIN: str = ""
    AUTH0_API_AUDIENCE: str = ""
    AUTH0_ALGORITHMS: List[str] = ["RS256"]
    
    # Security
    SECRET_KEY: str = "change-this-secret-key-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS - can be set via env var as comma-separated string or list
    CORS_ORIGINS: Union[str, List[str]] = "http://localhost:5173,https://skinalyze-web.vercel.app"
    
    # File Upload
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB
    UPLOAD_DIR: str = "uploads"
    
    # AI Model
    MODEL_PATH: str = "app/ml/models/skin_classifier.tflite"
    MODEL_CONFIDENCE_THRESHOLD: float = 0.5
    
    class Config:
        env_file = ".env"
    
    def get_cors_origins(self) -> List[str]:
        """Parse CORS_ORIGINS whether it's a string or list"""
        if isinstance(self.CORS_ORIGINS, str):
            return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
        return self.CORS_ORIGINS

settings = Settings()
