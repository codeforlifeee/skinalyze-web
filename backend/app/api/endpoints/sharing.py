from fastapi import APIRouter

router = APIRouter()


@router.post("/")
async def create_share_link():
    """Create a shareable link"""
    return {"token": "sample-token", "url": "https://example.com/shared/sample-token"}


@router.get("/{token}")
async def get_shared_data(token: str):
    """Get shared data by token"""
    return {"token": token, "data": {}}
