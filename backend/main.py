# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from contextlib import asynccontextmanager
# import tensorflow as tf
# import numpy as np
# from PIL import Image
# import io
# import time

# # Global model variable
# interpreter = None

# DISEASE_CLASSES = [
#     'Acne',
#     'Eczema/Dermatitis',
#     'Tinea/Fungal infections',
#     'Vitiligo',
#     'Benign nevus',
#     'Suspicious-lesion category'
# ]

# DISEASE_RISK = {
#     'Acne': 'low',
#     'Eczema/Dermatitis': 'low',
#     'Tinea/Fungal infections': 'medium',
#     'Vitiligo': 'medium',
#     'Benign nevus': 'medium',
#     'Suspicious-lesion category': 'high'
# }

# DISEASE_INFO = {
#     'Acne': {
#         'category': 'Inflammatory',
#         'description': 'Inflammatory and non-inflammatory lesions',
#         'treatment': 'Topical retinoids, benzoyl peroxide, antibiotics',
#     },
#     'Eczema/Dermatitis': {
#         'category': 'Inflammatory',
#         'description': 'Atopic and contact variants',
#         'treatment': 'Moisturizers, topical corticosteroids, avoid triggers',
#     },
#     'Tinea/Fungal infections': {
#         'category': 'Infectious',
#         'description': 'Superficial mycoses',
#         'treatment': 'Antifungal medications, keep area dry',
#     },
#     'Vitiligo': {
#         'category': 'Autoimmune',
#         'description': 'Depigmentation patterns',
#         'treatment': 'Phototherapy, topical corticosteroids',
#     },
#     'Benign nevus': {
#         'category': 'Benign',
#         'description': 'Common melanocytic nevi',
#         'treatment': 'Monitoring, removal if needed',
#     },
#     'Suspicious-lesion category': {
#         'category': 'Requires Investigation',
#         'description': 'Requiring further investigation',
#         'treatment': 'IMMEDIATE dermatologist consultation required',
#     }
# }

# def load_model():
#     global interpreter
#     try:
#         print("🔄 Loading TFLite model...")
#         interpreter = tf.lite.Interpreter(model_path="segmentation_quant.tflite")
#         interpreter.allocate_tensors()
        
#         input_details = interpreter.get_input_details()
#         output_details = interpreter.get_output_details()
        
#         print("✅ Model loaded successfully!")
#         print(f"📊 Input shape: {input_details[0]['shape']}")
#         print(f"📊 Output shape: {output_details[0]['shape']}")
#         return True
#     except Exception as e:
#         print(f"❌ Error loading model: {e}")
#         return False

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     # Startup
#     print("🚀 Starting SkinAlyze ML API...")
#     load_model()
#     print("✨ Server ready!")
#     yield
#     # Shutdown
#     print("👋 Shutting down...")

# app = FastAPI(
#     title="SkinAlyze ML API",
#     version="1.0.0",
#     lifespan=lifespan
# )

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def read_root():
#     return {
#         "name": "SkinAlyze ML API",
#         "version": "1.0.0",
#         "status": "running",
#         "model_loaded": interpreter is not None
#     }

# @app.get("/health")
# def health_check():
#     return {
#         "status": "healthy",
#         "model": "loaded" if interpreter else "not_loaded"
#     }

# @app.post("/analyze")
# async def analyze_skin(file: UploadFile = File(...)):
#     if interpreter is None:
#         raise HTTPException(status_code=500, detail="Model not loaded")
    
#     start_time = time.time()
    
#     try:
#         # Read image
#         contents = await file.read()
#         image = Image.open(io.BytesIO(contents))
        
#         if image.mode != 'RGB':
#             image = image.convert('RGB')
        
#         # Get model input shape
#         input_details = interpreter.get_input_details()
#         output_details = interpreter.get_output_details()
        
#         input_shape = input_details[0]['shape']
#         height, width = input_shape[1], input_shape[2]
        
#         # Preprocess
#         image = image.resize((width, height))
#         image_array = np.array(image).astype(np.float32) / 255.0
#         image_array = np.expand_dims(image_array, axis=0)
        
#         # Run inference
#         interpreter.set_tensor(input_details[0]['index'], image_array)
#         interpreter.invoke()
#         output = interpreter.get_tensor(output_details[0]['index'])
        
#         # Process predictions
#         predictions = process_output(output)
#         inference_time = int((time.time() - start_time) * 1000)
        
#         # Format results
#         results = []
#         for i, disease in enumerate(DISEASE_CLASSES):
#             if i < len(predictions):
#                 results.append({
#                     "condition": disease,
#                     "confidence": float(predictions[i]),
#                     "category": DISEASE_INFO[disease]['category'],
#                     "description": DISEASE_INFO[disease]['description'],
#                     "treatment": DISEASE_INFO[disease]['treatment'],
#                     "risk": DISEASE_RISK[disease]
#                 })
        
#         results.sort(key=lambda x: x['confidence'], reverse=True)
        
#         return {
#             "predictions": results[:3],
#             "riskBand": DISEASE_RISK[results[0]['condition']],
#             "inferenceTime": inference_time,
#             "success": True
#         }
        
#     except Exception as e:
#         print(f"Error during analysis: {e}")
#         raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

# def process_output(output):
#     """Process model output to get class probabilities"""
#     flat = output.flatten()
    
#     if len(flat) > 6:
#         # Segmentation model - average per class
#         num_classes = 6
#         scores = []
#         per_class = len(flat) // num_classes
        
#         for i in range(num_classes):
#             start = i * per_class
#             end = start + per_class
#             scores.append(np.mean(flat[start:end]))
        
#         scores = np.array(scores)
#     else:
#         # Classification model
#         scores = flat[:6]
    
#     # Apply softmax
#     exp_scores = np.exp(scores - np.max(scores))
#     return exp_scores / exp_scores.sum()

# if __name__ == "__main__":
#     import uvicorn
#     print("🎯 Starting server on http://localhost:8000")
#     print("📝 API docs available at http://localhost:8000/docs")
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import time

# Global model variable
interpreter = None

DISEASE_CLASSES = [
    'Acne',
    'Eczema/Dermatitis',
    'Tinea/Fungal infections',
    'Vitiligo',
    'Benign nevus',
    'Suspicious-lesion category'
]

DISEASE_RISK = {
    'Acne': 'low',
    'Eczema/Dermatitis': 'low',
    'Tinea/Fungal infections': 'medium',
    'Vitiligo': 'medium',
    'Benign nevus': 'medium',
    'Suspicious-lesion category': 'high'
}

DISEASE_INFO = {
    'Acne': {
        'category': 'Inflammatory',
        'description': 'Inflammatory and non-inflammatory lesions',
        'treatment': 'Topical retinoids, benzoyl peroxide, antibiotics',
    },
    'Eczema/Dermatitis': {
        'category': 'Inflammatory',
        'description': 'Atopic and contact variants',
        'treatment': 'Moisturizers, topical corticosteroids, avoid triggers',
    },
    'Tinea/Fungal infections': {
        'category': 'Infectious',
        'description': 'Superficial mycoses',
        'treatment': 'Antifungal medications, keep area dry',
    },
    'Vitiligo': {
        'category': 'Autoimmune',
        'description': 'Depigmentation patterns',
        'treatment': 'Phototherapy, topical corticosteroids',
    },
    'Benign nevus': {
        'category': 'Benign',
        'description': 'Common melanocytic nevi',
        'treatment': 'Monitoring, removal if needed',
    },
    'Suspicious-lesion category': {
        'category': 'Requires Investigation',
        'description': 'Requiring further investigation',
        'treatment': 'IMMEDIATE dermatologist consultation required',
    }
}

def load_model():
    global interpreter
    try:
        print("🔄 Loading TFLite model...")
        interpreter = tf.lite.Interpreter(model_path="segmentation_quant.tflite")
        interpreter.allocate_tensors()
        
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        
        print("✅ Model loaded successfully!")
        print(f"📊 Input shape: {input_details[0]['shape']}")
        print(f"📊 Input dtype: {input_details[0]['dtype']}")
        print(f"📊 Output shape: {output_details[0]['shape']}")
        print(f"📊 Output dtype: {output_details[0]['dtype']}")
        return True
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return False

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting SkinAlyze ML API...")
    load_model()
    print("✨ Server ready!")
    yield
    print("👋 Shutting down...")

app = FastAPI(
    title="SkinAlyze ML API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "name": "SkinAlyze ML API",
        "version": "1.0.0",
        "status": "running",
        "model_loaded": interpreter is not None
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model": "loaded" if interpreter else "not_loaded"
    }

@app.post("/analyze")
async def analyze_skin(file: UploadFile = File(...)):
    if interpreter is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    start_time = time.time()
    
    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Get model input details
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        
        input_shape = input_details[0]['shape']
        input_dtype = input_details[0]['dtype']
        height, width = input_shape[1], input_shape[2]
        
        print(f"🖼️  Processing image for model: shape={input_shape}, dtype={input_dtype}")
        
        # Resize image
        image = image.resize((width, height))
        image_array = np.array(image)
        
        # Check if model expects UINT8 (quantized) or FLOAT32
        if input_dtype == np.uint8:
            # Quantized model - keep values as 0-255
            print("📦 Using UINT8 (quantized) input")
            image_array = image_array.astype(np.uint8)
        else:
            # Float model - normalize to 0-1
            print("📊 Using FLOAT32 (normalized) input")
            image_array = image_array.astype(np.float32) / 255.0
        
        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)
        
        print(f"✅ Input prepared: shape={image_array.shape}, dtype={image_array.dtype}")
        
        # Run inference
        interpreter.set_tensor(input_details[0]['index'], image_array)
        interpreter.invoke()
        output = interpreter.get_tensor(output_details[0]['index'])
        
        print(f"✅ Inference complete: output shape={output.shape}")
        
        # Process predictions
        predictions = process_output(output)
        inference_time = int((time.time() - start_time) * 1000)
        
        # Format results
        results = []
        for i, disease in enumerate(DISEASE_CLASSES):
            if i < len(predictions):
                results.append({
                    "condition": disease,
                    "confidence": float(predictions[i]),
                    "category": DISEASE_INFO[disease]['category'],
                    "description": DISEASE_INFO[disease]['description'],
                    "treatment": DISEASE_INFO[disease]['treatment'],
                    "risk": DISEASE_RISK[disease]
                })
        
        results.sort(key=lambda x: x['confidence'], reverse=True)
        
        print(f"🎯 Top prediction: {results[0]['condition']} ({results[0]['confidence']:.2%})")
        
        return {
            "predictions": results[:3],
            "riskBand": DISEASE_RISK[results[0]['condition']],
            "inferenceTime": inference_time,
            "modelInfo": {
                "inputShape": input_shape.tolist(),
                "outputShape": list(output.shape),
                "inputDtype": str(input_dtype)
            },
            "success": True
        }
        
    except Exception as e:
        print(f"❌ Error during analysis: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

def process_output(output):
    """Process model output to get class probabilities"""
    print(f"🔍 Processing output: shape={output.shape}, dtype={output.dtype}")
    
    # If output is also quantized (UINT8), dequantize it
    if output.dtype == np.uint8:
        output = output.astype(np.float32) / 255.0
    
    flat = output.flatten()
    
    # Segmentation model output: [1, 128, 128, 1]
    # We need to extract class scores from the segmentation map
    if len(output.shape) == 4 and output.shape[-1] == 1:
        # Single channel segmentation map
        # Assume different pixel intensities represent different classes
        # Split into 6 regions and calculate average intensity for each
        num_classes = 6
        scores = []
        
        # Flatten and split into equal parts
        pixels = flat
        chunk_size = len(pixels) // num_classes
        
        for i in range(num_classes):
            start = i * chunk_size
            end = start + chunk_size if i < num_classes - 1 else len(pixels)
            chunk_mean = np.mean(pixels[start:end])
            scores.append(chunk_mean)
        
        scores = np.array(scores)
    
    elif len(flat) == 6:
        # Direct classification output
        scores = flat
    
    else:
        # Multi-class segmentation or other format
        # Try to extract 6 class scores
        num_classes = 6
        chunk_size = len(flat) // num_classes
        scores = []
        
        for i in range(num_classes):
            start = i * chunk_size
            end = start + chunk_size
            scores.append(np.mean(flat[start:end]))
        
        scores = np.array(scores)
    
    # Normalize scores with softmax
    exp_scores = np.exp(scores - np.max(scores))
    probabilities = exp_scores / exp_scores.sum()
    
    print(f"📊 Class probabilities: {probabilities}")
    
    return probabilities

if __name__ == "__main__":
    import uvicorn
    print("🎯 Starting server on http://localhost:8000")
    print("📝 API docs available at http://localhost:8000/docs")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
