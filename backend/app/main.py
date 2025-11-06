from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.core.database import engine
from app.models import Base
from app.api.endpoints import auth, patients, analysis, tracking, sharing, fairness

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SkinAlyze API",
    description="Clinician-Only Smart Dermatology Assistant",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(patients.router, prefix="/api/patients", tags=["patients"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["analysis"])
app.include_router(tracking.router, prefix="/api/tracking", tags=["tracking"])
app.include_router(sharing.router, prefix="/api/sharing", tags=["sharing"])
app.include_router(fairness.router, prefix="/api/fairness", tags=["fairness"])

@app.get("/")
async def root():
    return {
        "name": "SkinAlyze API",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
