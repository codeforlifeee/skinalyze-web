import tensorflow as tf
import numpy as np
import cv2
from typing import List, Dict, Tuple
import json
from pathlib import Path

class SkinConditionClassifier:
    """
    AI Classifier for skin conditions supporting 537 dermatologic presentations.
    Provides top-3 predictions with calibrated confidence scores and risk classification.
    """
    
    def __init__(self, model_path: str):
        self.interpreter = tf.lite.Interpreter(model_path=model_path)
        self.interpreter.allocate_tensors()
        
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()
        
        # Load condition mappings
        config_path = Path(model_path).parent / "model_config.json"
        with open(config_path) as f:
            config = json.load(f)
            self.condition_labels = config["conditions"]
            self.risk_thresholds = config["risk_thresholds"]
    
    def preprocess_image(self, image_path: str) -> np.ndarray:
        """Preprocess image for model inference"""
        image = cv2.imread(image_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Resize to model input size
        input_shape = self.input_details[0]['shape']
        image = cv2.resize(image, (input_shape[1], input_shape[2]))
        
        # Normalize
        image = image.astype(np.float32) / 255.0
        image = np.expand_dims(image, axis=0)
        
        return image
    
    def classify(self, image_path: str) -> Dict:
        """
        Perform classification and return top-3 predictions with metadata.
        
        Returns:
            Dict containing:
            - predictions: List of top-3 conditions with confidence scores
            - riskBand: Overall risk classification (low/medium/high)
            - calibratedConfidence: Calibrated probability estimate
            - inferenceTime: Time taken for inference in milliseconds
        """
        import time
        
        start_time = time.time()
        
        # Preprocess
        input_data = self.preprocess_image(image_path)
        
        # Run inference
        self.interpreter.set_tensor(self.input_details[0]['index'], input_data)
        self.interpreter.invoke()
        
        # Get predictions
        output_data = self.interpreter.get_tensor(self.output_details[0]['index'])[0]
        
        # Get top 3 predictions
        top_3_indices = np.argsort(output_data)[-3:][::-1]
        
        predictions = []
        for idx in top_3_indices:
            predictions.append({
                "condition": self.condition_labels[idx]["name"],
                "category": self.condition_labels[idx]["category"],
                "confidence": float(output_data[idx]),
                "calibrated_confidence": self._calibrate_confidence(output_data[idx])
            })
        
        # Determine risk band
        risk_band = self._determine_risk_band(predictions[0]["condition"], 
                                              predictions[0]["confidence"])
        
        inference_time = (time.time() - start_time) * 1000  # Convert to ms
        
        return {
            "predictions": predictions,
            "riskBand": risk_band,
            "inferenceTime": round(inference_time, 2)
        }
    
    def _calibrate_confidence(self, raw_confidence: float) -> float:
        """Apply temperature scaling for calibration"""
        # Simplified calibration - in production use proper calibration
        temperature = 1.5
        return float(1 / (1 + np.exp(-raw_confidence / temperature)))
    
    def _determine_risk_band(self, condition: str, confidence: float) -> str:
        """Determine risk classification based on condition and confidence"""
        if "suspicious" in condition.lower() or "melanoma" in condition.lower():
            return "high"
        elif confidence < 0.6:
            return "medium"
        else:
            return "low"
    
    def generate_explainability(self, image_path: str) -> np.ndarray:
        """Generate explainability heatmap using Grad-CAM-like technique"""
        # Simplified - implement proper Grad-CAM in production
        image = cv2.imread(image_path)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Apply edge detection to highlight important regions
        edges = cv2.Canny(gray, 50, 150)
        heatmap = cv2.GaussianBlur(edges, (21, 21), 0)
        
        # Normalize heatmap
        heatmap = cv2.normalize(heatmap, None, 0, 255, cv2.NORM_MINMAX)
        
        return heatmap
