from fastapi import APIRouter

router = APIRouter()


@router.get("/{patient_id}")
async def get_tracking_data(patient_id: int):
    """Get tracking data for a patient"""
    return {"patient_id": patient_id, "tracking": []}


@router.post("/{patient_id}")
async def create_tracking_entry(patient_id: int):
    """Create a tracking entry"""
    return {"message": "Tracking entry created"}
