from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict
import shutil
from pathlib import Path
import uuid

from app.core.database import get_db
from app.services.ai_classifier import SkinConditionClassifier
from app.core.config import settings

router = APIRouter()

# Initialize classifier
classifier = SkinConditionClassifier(settings.MODEL_PATH)

@router.post("/classify")
async def classify_image(
    file: UploadFile = File(...),
    patient_id: str = None,
    db: Session = Depends(get_db)
) -> Dict:
    """
    Classify skin condition from uploaded image.
    Returns top-3 predictions with confidence scores and risk classification.
    """
    
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Save uploaded file
    upload_dir = Path(settings.UPLOAD_DIR) / "analyses"
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    file_id = str(uuid.uuid4())
    file_extension = Path(file.filename).suffix
    file_path = upload_dir / f"{file_id}{file_extension}"
    
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # Perform classification
        results = classifier.classify(str(file_path))
        
        # Generate explainability heatmap
        explainability = classifier.generate_explainability(str(file_path))
        
        # Save to database (implementation depends on your models)
        # ...
        
        return {
            **results,
            "imageId": file_id,
            "explainability": {
                "available": True,
                "type": "grad_cam"
            }
        }
        
    except Exception as e:
        # Clean up file on error
        file_path.unlink(missing_ok=True)
        raise HTTPException(status_code=500, detail=f"Classification failed: {str(e)}")

@router.get("/explainability/{image_id}")
async def get_explainability(image_id: str):
    """Get explainability heatmap for analyzed image"""
    # Implementation for retrieving and returning explainability visualization
    pass
