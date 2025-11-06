import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Camera, Upload, Loader2, ArrowLeft, CheckCircle, AlertTriangle, AlertCircle, X, Info, Wifi, WifiOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { analyzeSkinImage, checkBackendHealth } from '../services/mlService';

export default function AnalysisView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [backendOnline, setBackendOnline] = useState(false);

  // Check backend health on mount
  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    const isOnline = await checkBackendHealth();
    setBackendOnline(isOnline);
    if (!isOnline) {
      toast.error('Backend server is offline. Start it with: python backend/main.py', {
        duration: 5000,
      });
    } else {
      toast.success('Backend connected!');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      toast.success('Image uploaded successfully');
      setError(null);
      setAnalysisResults(null); // Clear old results
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    setAnalysisResults(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!image) {
      toast.error('Please upload an image first');
      return;
    }

    if (!backendOnline) {
      toast.error('Backend is offline! Start backend server first.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    console.log('🚀 Starting analysis...');
    console.log('📁 Image file:', image.name, image.type, image.size);

    try {
      // Call ML service (which calls backend)
      const results = await analyzeSkinImage(image);
      
      console.log('🎉 Analysis complete!', results);
      
      setAnalysisResults(results);
      toast.success('Analysis completed successfully!');
    } catch (err) {
      console.error('💥 Analysis error:', err);
      setError(err.message || 'Analysis failed');
      toast.error(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveVisit = () => {
    const visitData = {
      patientId: id,
      date: new Date().toISOString(),
      results: analysisResults,
      imageUrl: imagePreview
    };

    const visits = JSON.parse(localStorage.getItem('visits') || '[]');
    visits.push(visitData);
    localStorage.setItem('visits', JSON.stringify(visits));

    toast.success('Visit saved successfully');
    navigate(`/patients/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link to={`/patients/${id}`} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
            AI Skin Analysis
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm sm:text-base text-gray-600 hidden sm:block">
              Upload image for ML model analysis
            </p>
            {backendOnline ? (
              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                <Wifi className="w-3 h-3" />
                Backend Online
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                <WifiOff className="w-3 h-3" />
                Backend Offline
              </span>
            )}
          </div>
        </div>
        {analysisResults && (
          <button onClick={handleSaveVisit} className="btn-primary text-sm sm:text-base px-3 sm:px-4 py-2">
            Save Visit
          </button>
        )}
      </div>

      {/* Backend Status Alert */}
      {!backendOnline && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Backend Server Not Running</p>
              <p className="text-xs text-red-700 mt-1">
                Please start the backend: <code className="bg-red-100 px-2 py-0.5 rounded">python backend/main.py</code>
              </p>
              <button 
                onClick={checkBackend}
                className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
              >
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Image Upload Section */}
        <div className="card p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Image Capture
          </h2>
          
          {imagePreview ? (
            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-64 sm:h-80 object-cover rounded-lg border-2 border-gray-200" 
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <label className="btn-secondary flex-1 text-center cursor-pointer text-sm sm:text-base py-2 sm:py-3">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                  Change Image
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </label>
                <button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || !backendOnline} 
                  className={`btn-primary flex-1 text-sm sm:text-base py-2 sm:py-3 ${
                    (isAnalyzing || !backendOnline) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                      Analyze with ML
                    </>
                  )}
                </button>
              </div>

              {analysisResults && (
                <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className="text-blue-800">
                      <strong>Inference Time:</strong> {analysisResults.inferenceTime}ms
                    </span>
                    <span className="text-blue-600 font-medium">✓ ML Analysis Complete</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800 whitespace-pre-line">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 text-center hover:border-primary-400 transition-colors">
              <label className="cursor-pointer block">
                <Camera className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-400 mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-600 mb-1 sm:mb-2 font-medium">
                  Upload skin image for ML analysis
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  PNG, JPG, JPEG up to 10MB
                </p>
                <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                  Choose Image
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                />
              </label>
            </div>
          )}

          {/* Model Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-gray-700 mb-1">
                  TensorFlow Lite Model - 6 Conditions
                </p>
                <p className="text-xs text-gray-600">
                  Acne, Eczema/Dermatitis, Fungal infections, Vitiligo, Benign nevus, Suspicious lesions
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results Section */}
        <div className="card p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            ML Analysis Results
          </h2>
          
          {isAnalyzing ? (
            <div className="flex items-center justify-center h-64 sm:h-96">
              <div className="text-center">
                <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-primary-600 animate-spin mx-auto" />
                <p className="text-sm sm:text-base text-gray-600 mt-3 sm:mt-4 font-medium">
                  Running TensorFlow Lite model...
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Processing with real ML model
                </p>
              </div>
            </div>
          ) : analysisResults ? (
            <div className="space-y-4 sm:space-y-6">
              <RiskBandIndicator risk={analysisResults.riskBand} />

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                  Top 3 ML Predictions
                </h3>
                {analysisResults.predictions.map((prediction, index) => (
                  <PredictionCard
                    key={index}
                    rank={index + 1}
                    prediction={prediction}
                  />
                ))}
              </div>

              <div className="p-3 sm:p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <h4 className="text-sm font-semibold text-primary-900 mb-2">
                  Recommended Treatment
                </h4>
                <p className="text-xs sm:text-sm text-primary-800">
                  {analysisResults.predictions[0].treatment}
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                <div className="flex gap-2 sm:gap-3">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-yellow-800">
                      AI Advisory Tool - Clinical Judgment Required
                    </p>
                    <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                      These are ML-generated predictions from TensorFlow Lite model. 
                      Final diagnosis must be made by qualified dermatologists.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 sm:h-96 text-gray-500">
              <div className="text-center">
                <Camera className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
                <p className="text-sm sm:text-base font-medium">No analysis yet</p>
                <p className="text-xs sm:text-sm mt-2">
                  Upload an image to begin ML analysis
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Risk Band Component
function RiskBandIndicator({ risk }) {
  const riskConfig = {
    low: {
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: CheckCircle,
      label: 'Low Risk',
      message: 'Manageable with standard care',
    },
    medium: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: AlertCircle,
      label: 'Medium Risk',
      message: 'Requires monitoring and treatment',
    },
    high: {
      color: 'bg-red-100 text-red-800 border-red-300',
      icon: AlertTriangle,
      label: 'High Risk',
      message: 'Immediate dermatologist consultation required',
    },
  };

  const config = riskConfig[risk] || riskConfig.medium;
  const Icon = config.icon;

  return (
    <div className={`border-2 rounded-lg p-3 sm:p-4 ${config.color}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold">{config.label}</h3>
          <p className="text-xs sm:text-sm mt-1">{config.message}</p>
        </div>
      </div>
    </div>
  );
}

// Prediction Card Component
function PredictionCard({ rank, prediction }) {
  const confidencePercent = (prediction.confidence * 100).toFixed(1);
  
  const rankColors = {
    1: 'border-primary-500 bg-primary-50',
    2: 'border-gray-300 bg-gray-50',
    3: 'border-gray-200 bg-white',
  };

  return (
    <div className={`border-2 ${rankColors[rank]} rounded-lg p-3 sm:p-4`}>
      <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {rank === 1 && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />}
            <span className="text-xs font-medium text-gray-500">ML Rank #{rank}</span>
          </div>
          <h4 className="text-sm sm:text-base font-semibold text-gray-900 leading-tight">
            {prediction.condition}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600">{prediction.category}</p>
          <p className="text-xs text-gray-500 mt-1">{prediction.description}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{confidencePercent}%</div>
          <div className="text-xs text-gray-500">confidence</div>
        </div>
      </div>
      
      <div className="mt-2 sm:mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              rank === 1 ? 'bg-primary-600' : 'bg-gray-400'
            }`}
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
