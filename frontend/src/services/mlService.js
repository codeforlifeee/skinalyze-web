// ML Service - Calls FastAPI Backend for Real TensorFlow Lite Model Inference

const BACKEND_URL = 'http://localhost:8000';

/**
 * Analyze skin image using ML backend
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise} Analysis results from ML model
 */
export async function analyzeSkinImage(imageFile) {
  try {
    console.log('🔍 Starting ML analysis...');
    console.log('📤 Sending to backend:', BACKEND_URL);
    
    // Create form data
    const formData = new FormData();
    formData.append('file', imageFile);

    // Call backend API
    const response = await fetch(`${BACKEND_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Backend error:', errorData);
      throw new Error(errorData.detail || `Backend error: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ ML Analysis SUCCESS:', result);
    
    return {
      predictions: result.predictions,
      riskBand: result.riskBand,
      inferenceTime: result.inferenceTime,
      modelInfo: result.modelInfo,
    };
    
  } catch (error) {
    console.error('❌ ML Service Error:', error);
    
    // Better error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(
        '🔴 Backend server is not responding!\n\n' +
        'Make sure:\n' +
        '1. Backend is running: python backend/main.py\n' +
        '2. Backend is on http://localhost:8000\n' +
        '3. CORS is enabled'
      );
    }
    
    throw error;
  }
}

// Health check function
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${BACKEND_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

// Export as singleton
export const mlService = {
  analyzeImage: analyzeSkinImage,
  checkHealth: checkBackendHealth,
};

// Default export
export default mlService;
