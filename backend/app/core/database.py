from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from typing import Generator

from app.core.config import settings

"""
Synchronous SQLAlchemy database setup.

Exposes:
- engine: SQLAlchemy Engine bound to settings.DATABASE_URL
- SessionLocal: sessionmaker factory
- get_db(): FastAPI dependency yielding a DB session per request
"""

# Create engine; enable pool_pre_ping to avoid stale connections on PaaS providers
engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator:
	db = SessionLocal()
	try:
		yield db
	finally:
		db.close()
