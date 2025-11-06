from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def get_patients():
    """Get all patients"""
    return {"patients": []}


@router.post("/")
async def create_patient():
    """Create a new patient"""
    return {"message": "Patient created"}


@router.get("/{patient_id}")
async def get_patient(patient_id: int):
    """Get a specific patient"""
    return {"patient_id": patient_id}
