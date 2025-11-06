# Backend Dockerfile for FastAPI + TensorFlow + OpenCV
# Uses Python 3.11 to ensure wheel availability and stability on Linux
FROM python:3.11-slim

# System settings for Python runtime
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# Install OS dependencies required by OpenCV and TensorFlow wheels
# Keep the image small by cleaning apt cache
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       libglib2.0-0 \
       libsm6 \
       libxrender1 \
       libxext6 \
       libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Create workdir
WORKDIR /app

# Install Python deps first (better layer caching)
COPY requirements.txt /app/requirements.txt
RUN python -m pip install --upgrade pip \
    && pip install -r /app/requirements.txt

# Copy app source
COPY . /app

# Ensure uploads directory exists
RUN mkdir -p /app/uploads

# Expose default port (platforms like Render/Cloud Run will override with $PORT)
EXPOSE 8080
ENV PORT=8080

# Start the FastAPI app
# Use sh -c so we can expand $PORT at runtime
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8080}"]
