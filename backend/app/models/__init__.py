"""
Database models package.

Exports Base from database.py and all model classes.
"""

from app.core.database import Base

# Import all models here so they're registered with Base
from .user import User
from .patient import Patient
from .analysis import Analysis
from .visit import Visit
from .metric import Metric
from .shared_summary import SharedSummary

__all__ = [
    "Base",
    "User",
    "Patient",
    "Analysis",
    "Visit",
    "Metric",
    "SharedSummary",
]
