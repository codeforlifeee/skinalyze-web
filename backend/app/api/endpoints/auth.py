from fastapi import APIRouter

router = APIRouter()


@router.get("/me")
async def get_current_user():
    """Get current authenticated user"""
    return {"user": "authenticated"}


@router.post("/login")
async def login():
    """Login endpoint"""
    return {"message": "Login successful"}
