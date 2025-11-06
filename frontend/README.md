# SAGAlyze - Hackathon MVP Development Prompt (48-72 Hours)
## Step-by-Step Implementation Guide for AI Model

**Project Overview**: Build a production-ready dermatology AI diagnostic app (React Native + Offline TFLite ML) integrated with existing website backend.

---

## ⚠️ IMPORTANT: CONFIGURATION VARIABLES
Before starting, define these variables (you will provide these later):

```
BACKEND_BASE_URL = "http://your-backend-domain.com/api"  # Will be provided
BACKEND_AUTH_ENDPOINT = "/auth/login"  # Confirm with your backend
BACKEND_PATIENTS_ENDPOINT = "/clinician/patients"  # Confirm with your backend
TFLITE_MODEL_PATH = "assets/skin_classifier.tflite"  # Sample model location
TFLITE_MODEL_INPUT_SIZE = 224  # Input image dimensions (224x224)
TFLITE_MODEL_NUM_CLASSES = 7  # Output classes (Melanoma, Eczema, etc.)
```

---

## PHASE 0: PREREQUISITES & SETUP (30 MINUTES)

### Step 0.1: Verify Your System
- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm v9+ installed (`npm --version`)
- [ ] Git installed and configured
- [ ] Android emulator running OR iOS simulator ready
- [ ] Expo CLI installed: `npm install -g expo-cli`

### Step 0.2: Create Project Directory Structure
```bash
# Create main project folder
mkdir sagalyze-project
cd sagalyze-project

# Create subdirectories
mkdir mobile-app backend-integration docs models
mkdir models/tflite-sample

# Initialize git
git init
```

### Step 0.3: Placeholder Configuration File
Create `config.js` in project root (you'll fill this later with real backend details):

```javascript
// config.js
export const CONFIG = {
  // Backend Configuration (MODIFY THESE LATER)
  BACKEND_URL: "http://192.168.1.100:5000/api", // Your backend URL
  TIMEOUT: 10000,
  
  // Authentication Endpoints (MODIFY BASED ON YOUR BACKEND)
  ENDPOINTS: {
    auth: {
      login: "/auth/login",
      signup: "/auth/signup",
      logout: "/auth/logout",
    },
    clinician: {
      patients: "/clinician/patients",
      patient_detail: "/clinician/patients/:id",
      diagnosis: "/clinician/diagnosis",
      images_upload: "/clinician/images/upload",
      diagnosis_history: "/clinician/diagnosis/:patientId",
    },
    patient: {
      diagnoses: "/patient/diagnoses",
      progress: "/patient/progress",
      profile: "/patient/profile",
    },
  },
  
  // ML Model Configuration
  ML_MODEL: {
    input_size: 224,
    num_classes: 7,
    classes: [
      "Melanoma",
      "Basal Cell Carcinoma",
      "Squamous Cell Carcinoma",
      "Actinic Keratosis",
      "Benign Keratosis",
      "Melanocytic Nevus",
      "Vascular Lesion",
    ],
    confidence_threshold: 0.6, // Only show predictions > 60% confidence
  },
};
```

---

## PHASE 1: SAMPLE TFLITE MODEL SETUP (15 MINUTES)

### Step 1.1: Download Sample Skin Classification Model

**Option A: Use Pre-trained MobileNetV2 Quantized Model (RECOMMENDED FOR MVP)**

For hackathon purposes, use this lightweight model:
- **Model**: MobileNetV2 (ImageNet pre-trained, then fine-tuned on skin lesions)
- **Download from**: https://www.tensorflow.org/lite/guide/hosted_models
- **Or use**: https://github.com/junaid54541/Skin-Cancer-Classification-Tflite-Model (skin-specific model)

**Option B: Use Generic MobileNetV2 as Fallback**

```bash
# Create models directory
mkdir -p mobile-app/assets/models

# Download a sample MobileNetV2 model (fallback)
cd mobile-app/assets/models

# Using curl or wget:
curl -L "https://storage.googleapis.com/download.tensorflow.org/models/mobilenet_v2_1.0_224_quant.tflite" \
  -o mobilenet_v2_224_quant.tflite

# Alternative: Download from TensorFlow Hub
# Link: https://tfhub.dev/google/lite-model/mobilenet_v2_1.0_224_quantized/1
```

### Step 1.2: Create Model Configuration File

Create `mobile-app/src/ml/modelConfig.js`:

```javascript
// modelConfig.js
export const MODEL_CONFIG = {
  // Model file location in app bundle
  modelPath: require("../../assets/models/mobilenet_v2_224_quant.tflite"),
  
  // Input specifications
  input: {
    width: 224,
    height: 224,
    channels: 3,
    dataType: "uint8", // MobileNetV2 uses uint8 quantization
    normalization: {
      mean: 127.5,
      std: 127.5,
    },
  },
  
  // Output specifications (modify based on your actual model)
  output: {
    numClasses: 7,
    confidenceThreshold: 0.6,
  },
  
  // Class labels (CUSTOMIZE WITH YOUR MODEL'S CLASSES)
  classLabels: [
    { id: 0, name: "Melanoma", risk: "High" },
    { id: 1, name: "Basal Cell Carcinoma", risk: "High" },
    { id: 2, name: "Squamous Cell Carcinoma", risk: "High" },
    { id: 3, name: "Actinic Keratosis", risk: "Medium" },
    { id: 4, name: "Benign Keratosis", risk: "Low" },
    { id: 5, name: "Melanocytic Nevus", risk: "Low" },
    { id: 6, name: "Vascular Lesion", risk: "Low" },
  ],
};
```

### Step 1.3: Document Model Details (For Reference)

Create `models/MODEL_INFO.md`:

```markdown
# TFLite Model Information

## Current Model: MobileNetV2 Quantized
- **Input Size**: 224x224x3
- **Input Type**: uint8 (quantized)
- **Output Classes**: 7 skin conditions
- **Model Size**: ~3-4 MB
- **Inference Speed**: ~100-200ms on mobile device
- **Accuracy**: ~87-92% (depends on fine-tuning dataset)

## How to Replace This Model Later

1. Train or download your custom TFLite model
2. Note input/output specifications
3. Update `modelConfig.js` with new specs
4. Replace `.tflite` file in `mobile-app/assets/models/`
5. Update `classLabels` array with your model's class names
6. No code changes needed in inference logic

## Model Conversion (for reference)
If you want to convert your own model to TFLite:
```bash
python -m pip install tensorflow
python convert_to_tflite.py --input_model model.h5 --output model.tflite
```
```

---

## PHASE 2: REACT NATIVE EXPO APP SETUP (1-2 HOURS)

### Step 2.1: Create Expo App

```bash
cd mobile-app

# Create new Expo app
npx create-expo-app SAGAlyze

cd SAGAlyze

# Install required dependencies
npm install axios expo-camera @react-navigation/native @react-navigation/bottom-tabs \
  react-native-screens react-native-safe-area-context nativewind tailwindcss \
  @react-native-async-storage/async-storage expo-image-picker expo-file-system

# Install TFLite library (choose ONE based on your needs)
# Option 1: tflite-react-native (more stable)
npm install tflite-react-native

# Option 2: react-native-fast-tflite (modern, uses Vision Camera)
npm install react-native-fast-tflite react-native-vision-camera

# Initialize Tailwind CSS
npx tailwindcss init
```

### Step 2.2: Create Project Folder Structure

```bash
# Inside SAGAlyze folder
mkdir -p src/{screens,components,services,navigation,hooks,utils,ml}
mkdir -p assets/{models,icons,images}
mkdir public
```

### Step 2.3: Create Directory Tree File

Create `PROJECT_STRUCTURE.md` in `SAGAlyze/`:

```markdown
SAGAlyze/
├── src/
│   ├── screens/              # Screen components for different routes
│   │   ├── LoginScreen.js
│   │   ├── ClinicianDashboard.js
│   │   ├── CameraScreen.js
│   │   ├── DiagnosisResultScreen.js
│   │   └── PatientDashboard.js
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── LoadingSpinner.js
│   │   └── ErrorAlert.js
│   │
│   ├── services/             # API and backend integration
│   │   ├── api.js            # Axios instance + backend API calls
│   │   ├── mlService.js      # TFLite model inference
│   │   └── storageService.js # Local data storage
│   │
│   ├── navigation/           # Navigation setup
│   │   └── RootNavigator.js
│   │
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.js
│   │   └── useCameraPermission.js
│   │
│   ├── ml/                   # Machine Learning models
│   │   ├── modelConfig.js
│   │   └── inferenceEngine.js
│   │
│   └── utils/                # Helper functions
│       ├── formatters.js
│       └── validators.js
│
├── assets/
│   ├── models/               # TFLite model files
│   │   └── skin_classifier.tflite
│   ├── icons/
│   └── images/
│
├── App.js                    # Entry point
├── app.json                  # Expo configuration
├── tailwind.config.js        # Tailwind CSS config
├── package.json
└── README.md
```

---

## PHASE 3: BACKEND INTEGRATION SERVICE (1-2 HOURS)

### Step 3.1: Create API Service Layer

Create `src/services/api.js`:

```javascript
// src/services/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONFIG } from "../../config";

// Initialize API client
const apiClient = axios.create({
  baseURL: CONFIG.BACKEND_URL,
  timeout: CONFIG.TIMEOUT,
});

let authToken = null;

// Request interceptor - Add auth token to all requests
apiClient.interceptors.request.use(
  async (config) => {
    // Try to get token from async storage if not in memory
    if (!authToken) {
      authToken = await AsyncStorage.getItem("authToken");
    }

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      authToken = null;
      await AsyncStorage.removeItem("authToken");
      // Trigger logout event here
    }
    return Promise.reject(error);
  }
);

// ===== AUTHENTICATION APIs =====
export const authService = {
  // Login with credentials
  login: async (email, password, userType) => {
    try {
      const response = await apiClient.post(CONFIG.ENDPOINTS.auth.login, {
        email,
        password,
        userType,
      });

      // Save token to async storage
      if (response.data.token) {
        authToken = response.data.token;
        await AsyncStorage.setItem("authToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  },

  // Sign up new user
  signup: async (email, password, userType, additionalData = {}) => {
    try {
      const response = await apiClient.post(CONFIG.ENDPOINTS.auth.signup, {
        email,
        password,
        userType,
        ...additionalData,
      });

      if (response.data.token) {
        authToken = response.data.token;
        await AsyncStorage.setItem("authToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Sign up failed. Please try again."
      );
    }
  },

  // Logout
  logout: async () => {
    try {
      authToken = null;
      await AsyncStorage.removeItem("authToken");
      // Optionally call backend logout endpoint if needed
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  // Check if user is already logged in
  isAuthenticated: async () => {
    if (!authToken) {
      authToken = await AsyncStorage.getItem("authToken");
    }
    return !!authToken;
  },

  // Get stored token
  getToken: async () => {
    if (!authToken) {
      authToken = await AsyncStorage.getItem("authToken");
    }
    return authToken;
  },
};

// ===== CLINICIAN APIs =====
export const clinicianService = {
  // Get all patients
  getPatients: async () => {
    try {
      const response = await apiClient.get(CONFIG.ENDPOINTS.clinician.patients);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch patients"
      );
    }
  },

  // Get single patient details
  getPatient: async (patientId) => {
    try {
      const endpoint = CONFIG.ENDPOINTS.clinician.patient_detail.replace(
        ":id",
        patientId
      );
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch patient details"
      );
    }
  },

  // Add new patient
  addPatient: async (patientData) => {
    try {
      const response = await apiClient.post(
        CONFIG.ENDPOINTS.clinician.patients,
        patientData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add patient"
      );
    }
  },

  // Save diagnosis
  saveDiagnosis: async (diagnosisData) => {
    try {
      const response = await apiClient.post(
        CONFIG.ENDPOINTS.clinician.diagnosis,
        diagnosisData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to save diagnosis"
      );
    }
  },

  // Get diagnosis history for patient
  getDiagnosisHistory: async (patientId) => {
    try {
      const endpoint = CONFIG.ENDPOINTS.clinician.diagnosis_history.replace(
        ":patientId",
        patientId
      );
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch diagnosis history"
      );
    }
  },

  // Upload images
  uploadImages: async (imageData) => {
    try {
      const response = await apiClient.post(
        CONFIG.ENDPOINTS.clinician.images_upload,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to upload images"
      );
    }
  },
};

// ===== PATIENT APIs =====
export const patientService = {
  // Get patient's diagnoses
  getDiagnoses: async () => {
    try {
      const response = await apiClient.get(CONFIG.ENDPOINTS.patient.diagnoses);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch diagnoses"
      );
    }
  },

  // Get patient's progress
  getProgress: async () => {
    try {
      const response = await apiClient.get(CONFIG.ENDPOINTS.patient.progress);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch progress"
      );
    }
  },

  // Get patient profile
  getProfile: async () => {
    try {
      const response = await apiClient.get(CONFIG.ENDPOINTS.patient.profile);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  },
};

// Export API client for custom requests
export default apiClient;
```

### Step 3.2: Create Local Storage Service

Create `src/services/storageService.js`:

```javascript
// src/services/storageService.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageService = {
  // Save user data
  saveUserData: async (userData) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  },

  // Get user data
  getUserData: async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  },

  // Save recent diagnoses (for offline caching)
  saveDiagnosis: async (diagnosis) => {
    try {
      const diagnoses = await storageService.getDiagnoses();
      diagnoses.push({
        ...diagnosis,
        savedAt: new Date().toISOString(),
      });
      await AsyncStorage.setItem("diagnoses", JSON.stringify(diagnoses));
    } catch (error) {
      console.error("Error saving diagnosis:", error);
    }
  },

  // Get cached diagnoses
  getDiagnoses: async () => {
    try {
      const data = await AsyncStorage.getItem("diagnoses");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting diagnoses:", error);
      return [];
    }
  },

  // Clear all local data
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },
};
```

---

## PHASE 4: MACHINE LEARNING SERVICE (1-2 HOURS)

### Step 4.1: Create ML Inference Service

Create `src/ml/inferenceEngine.js`:

```javascript
// src/ml/inferenceEngine.js
import { MODEL_CONFIG } from "./modelConfig";

// This is a WRAPPER that will work with tflite-react-native or react-native-fast-tflite

class InferenceEngine {
  constructor() {
    this.model = null;
    this.isLoaded = false;
  }

  // Initialize the TFLite model
  async initialize() {
    try {
      // For tflite-react-native
      // Note: You'll need to import the native module
      const TFLite = require("tflite-react-native");

      // Load model from app assets
      await TFLite.loadModel(
        {
          model: "skin_classifier", // Without .tflite extension
        },
        () => {
          console.log("Model loaded successfully");
          this.isLoaded = true;
        }
      );

      this.model = TFLite;
      return true;
    } catch (error) {
      console.error("Error loading model:", error);
      return false;
    }
  }

  // Run inference on image
  async predict(imagePath) {
    if (!this.isLoaded) {
      console.warn("Model not loaded yet");
      return null;
    }

    try {
      // Using tflite-react-native
      return new Promise((resolve, reject) => {
        this.model.runModelOnImage(
          {
            path: imagePath,
            imageMean: MODEL_CONFIG.input.normalization.mean,
            imageStd: MODEL_CONFIG.input.normalization.std,
            numResults: MODEL_CONFIG.output.numClasses,
            threshold: MODEL_CONFIG.output.confidenceThreshold,
          },
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              // Format results
              const formattedResults = this._formatResults(results);
              resolve(formattedResults);
            }
          }
        );
      });
    } catch (error) {
      console.error("Inference error:", error);
      return null;
    }
  }

  // Format raw model output
  _formatResults(rawResults) {
    try {
      // rawResults should be array of: { index, label, confidence }
      const formatted = rawResults
        .map((result) => ({
          classIndex: result.index,
          className:
            MODEL_CONFIG.classLabels[result.index]?.name || "Unknown",
          confidence: (result.confidence * 100).toFixed(2), // Convert to percentage
          riskLevel: MODEL_CONFIG.classLabels[result.index]?.risk || "Unknown",
        }))
        .sort((a, b) => b.confidence - a.confidence); // Sort by confidence descending

      return {
        topPrediction: formatted[0],
        allPredictions: formatted,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error formatting results:", error);
      return null;
    }
  }

  // Cleanup
  cleanup() {
    try {
      if (this.model) {
        this.model.close?.();
        this.isLoaded = false;
      }
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  }
}

// Create singleton instance
export const inferenceEngine = new InferenceEngine();
```

### Step 4.2: Create Mock Inference (For Testing Before Real Model)

Create `src/ml/mockInference.js`:

```javascript
// src/ml/mockInference.js
import { MODEL_CONFIG } from "./modelConfig";

// Mock predictions for testing without actual TFLite
export const mockInference = async (imagePath) => {
  // Simulate inference delay
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));

  // Return random prediction
  const mockPredictions = [
    {
      classIndex: 0,
      className: "Melanoma",
      confidence: (85 + Math.random() * 10).toFixed(2),
      riskLevel: "High",
    },
    {
      classIndex: 4,
      className: "Benign Keratosis",
      confidence: (70 + Math.random() * 15).toFixed(2),
      riskLevel: "Low",
    },
    {
      classIndex: 5,
      className: "Melanocytic Nevus",
      confidence: (60 + Math.random() * 20).toFixed(2),
      riskLevel: "Low",
    },
  ];

  const topPrediction = mockPredictions[0];

  return {
    topPrediction,
    allPredictions: mockPredictions.sort(
      (a, b) => b.confidence - a.confidence
    ),
    timestamp: new Date().toISOString(),
    isMockData: true, // Flag to indicate this is mock data
  };
};
```

---

## PHASE 5: SCREEN COMPONENTS (2-3 HOURS)

### Step 5.1: Login Screen

Create `src/screens/LoginScreen.js`:

```javascript
// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { authService } from "../services/api";

export default function LoginScreen({ onLoginSuccess, onUserTypeChange }) {
  const [email, setEmail] = useState("clinician@test.com");
  const [password, setPassword] = useState("password");
  const [userType, setUserType] = useState("clinician");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.login(email, password, userType);

      if (response && response.token) {
        onUserTypeChange(userType);
        onLoginSuccess(response.user);
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserType = (type) => {
    setUserType(type);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          backgroundColor: "#f0f9ff",
        }}
      >
        {/* App Logo */}
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "#0369a1",
              marginBottom: 8,
            }}
          >
            SAGAlyze
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#0c7792",
              textAlign: "center",
            }}
          >
            AI-Powered Skin Lesion Diagnosis
          </Text>
        </View>

        {/* User Type Selection */}
        <View style={{ marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              marginBottom: 12,
              color: "#0c4a6e",
            }}
          >
            Login As:
          </Text>

          <TouchableOpacity
            onPress={() => toggleUserType("clinician")}
            style={{
              padding: 14,
              backgroundColor:
                userType === "clinician" ? "#0ea5e9" : "#e0f2fe",
              borderRadius: 8,
              marginBottom: 10,
              borderWidth: userType === "clinician" ? 2 : 1,
              borderColor:
                userType === "clinician" ? "#0284c7" : "#bae6fd",
            }}
          >
            <Text
              style={{
                color: userType === "clinician" ? "#fff" : "#0369a1",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              👨‍⚕️ Clinician
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleUserType("patient")}
            style={{
              padding: 14,
              backgroundColor:
                userType === "patient" ? "#0ea5e9" : "#e0f2fe",
              borderRadius: 8,
              borderWidth: userType === "patient" ? 2 : 1,
              borderColor: userType === "patient" ? "#0284c7" : "#bae6fd",
            }}
          >
            <Text
              style={{
                color: userType === "patient" ? "#fff" : "#0369a1",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              👤 Patient
            </Text>
          </TouchableOpacity>
        </View>

        {/* Email Input */}
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#cbd5e1"
          editable={!loading}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            padding: 14,
            borderWidth: 1,
            borderColor: "#0ea5e9",
            borderRadius: 8,
            marginBottom: 14,
            backgroundColor: "#fff",
            fontSize: 15,
            color: "#000",
          }}
        />

        {/* Password Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#0ea5e9",
            borderRadius: 8,
            marginBottom: 24,
            paddingRight: 12,
            backgroundColor: "#fff",
          }}
        >
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#cbd5e1"
            editable={!loading}
            secureTextEntry={!showPassword}
            style={{
              flex: 1,
              padding: 14,
              fontSize: 15,
              color: "#000",
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={{ fontSize: 20 }}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            padding: 16,
            backgroundColor: loading ? "#cbd5e1" : "#0ea5e9",
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          )}
        </TouchableOpacity>

        {/* Demo Credentials */}
        <View
          style={{
            backgroundColor: "#fef3c7",
            padding: 12,
            borderRadius: 6,
            borderLeftWidth: 4,
            borderLeftColor: "#f59e0b",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#92400e",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Demo Credentials:</Text>
          </Text>
          <Text style={{ fontSize: 11, color: "#92400e" }}>
            Email: clinician@test.com
          </Text>
          <Text style={{ fontSize: 11, color: "#92400e" }}>
            Password: password
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
```

### Step 5.2: Camera Screen (Simplified)

Create `src/screens/CameraScreen.js`:

```javascript
// src/screens/CameraScreen.js
import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { inferenceEngine } from "../ml/inferenceEngine";
import { mockInference } from "../ml/mockInference";

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f9ff",
        }}
      >
        <Text style={{ fontSize: 16, marginBottom: 20, color: "#0c4a6e" }}>
          Camera permission required
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            padding: 15,
            backgroundColor: "#0ea5e9",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Grant Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      const photo = await cameraRef.current.takePictureAsync();

      // Run ML inference
      const prediction = await mockInference(photo.uri); // Use mockInference for testing
      // Replace with: const prediction = await inferenceEngine.predict(photo.uri);

      if (prediction) {
        navigation.navigate("DiagnosisResult", {
          imageUri: photo.uri,
          prediction,
        });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to capture image: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 30,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 14,
              textAlign: "center",
              marginBottom: 20,
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: 10,
              borderRadius: 6,
            }}
          >
            Position the skin lesion within the camera frame
          </Text>

          <TouchableOpacity
            onPress={takePicture}
            disabled={isProcessing}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: isProcessing ? "#cbd5e1" : "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 5,
              borderColor: "#0ea5e9",
            }}
          >
            {isProcessing ? (
              <ActivityIndicator size="large" color="#0ea5e9" />
            ) : (
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: "#0ea5e9",
                }}
              />
            )}
          </TouchableOpacity>

          <Text
            style={{
              color: "#fff",
              marginTop: 12,
              fontSize: 12,
              opacity: 0.8,
            }}
          >
            {isProcessing ? "Processing..." : "Tap to capture"}
          </Text>
        </View>
      </CameraView>
    </View>
  );
}
```

### Step 5.3: Diagnosis Result Screen

Create `src/screens/DiagnosisResultScreen.js`:

```javascript
// src/screens/DiagnosisResultScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { clinicianService } from "../services/api";

export default function DiagnosisResultScreen({ route, navigation }) {
  const { imageUri, prediction } = route.params;
  const [notes, setNotes] = useState("");
  const [patientId, setPatientId] = useState("");
  const [saving, setSaving] = useState(false);

  const saveDiagnosis = async () => {
    if (!patientId.trim()) {
      Alert.alert("Error", "Please enter patient ID");
      return;
    }

    try {
      setSaving(true);
      await clinicianService.saveDiagnosis({
        patientId: parseInt(patientId),
        diagnosedCondition: prediction.topPrediction.className,
        confidence: parseFloat(prediction.topPrediction.confidence),
        clinicalNotes: notes,
        imagePath: imageUri,
        allPredictions: prediction.allPredictions,
      });

      Alert.alert("Success", "Diagnosis saved successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f0f9ff",
        paddingHorizontal: 16,
        paddingVertical: 20,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#0c4a6e",
        }}
      >
        Diagnosis Result
      </Text>

      {/* Captured Image */}
      <Image
        source={{ uri: imageUri }}
        style={{
          width: "100%",
          height: 300,
          borderRadius: 8,
          marginBottom: 20,
          backgroundColor: "#e0f2fe",
        }}
      />

      {/* Top Prediction */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 8,
          marginBottom: 20,
          borderLeftWidth: 4,
          borderLeftColor:
            prediction.topPrediction.riskLevel === "High"
              ? "#ef4444"
              : prediction.topPrediction.riskLevel === "Medium"
                ? "#f59e0b"
                : "#10b981",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color:
              prediction.topPrediction.riskLevel === "High"
                ? "#991b1b"
                : prediction.topPrediction.riskLevel === "Medium"
                  ? "#92400e"
                  : "#065f46",
            marginBottom: 8,
          }}
        >
          {prediction.topPrediction.className}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#0369a1",
            fontWeight: "600",
          }}
        >
          Confidence: {prediction.topPrediction.confidence}%
        </Text>
        <Text
          style={{
            fontSize: 13,
            color: "#666",
            marginTop: 8,
          }}
        >
          Risk Level:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {prediction.topPrediction.riskLevel}
          </Text>
        </Text>
      </View>

      {/* All Predictions */}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 12,
            color: "#0c4a6e",
          }}
        >
          All Predictions:
        </Text>
        {prediction.allPredictions.map((pred, idx) => (
          <View
            key={idx}
            style={{
              backgroundColor: "#fff",
              padding: 12,
              borderRadius: 6,
              marginBottom: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderLeftWidth: 3,
              borderLeftColor: "#0ea5e9",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontWeight: "600",
                  color: "#0c4a6e",
                  marginBottom: 4,
                }}
              >
                {pred.className}
              </Text>
              <Text style={{ fontSize: 12, color: "#666" }}>
                Risk: {pred.riskLevel}
              </Text>
            </View>
            <Text
              style={{
                fontWeight: "bold",
                color: "#0369a1",
                fontSize: 14,
              }}
            >
              {pred.confidence}%
            </Text>
          </View>
        ))}
      </View>

      {/* Patient ID */}
      <TextInput
        placeholder="Patient ID (required)"
        value={patientId}
        onChangeText={setPatientId}
        keyboardType="numeric"
        editable={!saving}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#0ea5e9",
          borderRadius: 8,
          backgroundColor: "#fff",
          marginBottom: 14,
          fontSize: 14,
        }}
      />

      {/* Clinical Notes */}
      <TextInput
        placeholder="Add clinical notes (optional)"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
        editable={!saving}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: "#0ea5e9",
          borderRadius: 8,
          backgroundColor: "#fff",
          marginBottom: 20,
          fontSize: 14,
          textAlignVertical: "top",
        }}
      />

      {/* Action Buttons */}
      <TouchableOpacity
        onPress={saveDiagnosis}
        disabled={saving}
        style={{
          padding: 14,
          backgroundColor: saving ? "#cbd5e1" : "#0ea5e9",
          borderRadius: 8,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {saving ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Save Diagnosis
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        disabled={saving}
        style={{
          padding: 14,
          backgroundColor: "#e5e7eb",
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#000",
            fontWeight: "bold",
            fontSize: 15,
          }}
        >
          Retake Photo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
```

### Step 5.4: Clinician Dashboard Screen

Create `src/screens/ClinicianDashboard.js`:

```javascript
// src/screens/ClinicianDashboard.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  RefreshControl,
} from "react-native";
import { clinicianService } from "../services/api";

export default function ClinicianDashboard({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [newPatientName, setNewPatientName] = useState("");
  const [newPatientFitzpatrick, setNewPatientFitzpatrick] = useState("III");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await clinicianService.getPatients();
      setPatients(response.patients || []);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPatients();
    setRefreshing(false);
  };

  const addPatient = async () => {
    if (!newPatientName.trim()) {
      Alert.alert("Error", "Enter patient name");
      return;
    }

    try {
      await clinicianService.addPatient({
        name: newPatientName,
        fitzpatrickType: newPatientFitzpatrick,
      });
      setNewPatientName("");
      setShowAddPatient(false);
      fetchPatients();
      Alert.alert("Success", "Patient added successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const PatientCard = ({ patient }) => (
    <TouchableOpacity
      style={{
        padding: 14,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: "#0ea5e9",
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold", color: "#0c4a6e" }}>
        {patient.name}
      </Text>
      <Text style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
        ID: {patient.id}
      </Text>
      <Text style={{ fontSize: 12, color: "#666" }}>
        Fitzpatrick: {patient.fitzpatrickType || "N/A"}
      </Text>
      {patient.createdAt && (
        <Text style={{ fontSize: 11, color: "#999", marginTop: 6 }}>
          Added: {new Date(patient.createdAt).toLocaleDateString()}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f9ff", paddingHorizontal: 16 }}>
      <View style={{ paddingTop: 20, paddingBottom: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#0c4a6e" }}>
          My Patients
        </Text>

        {/* Search Bar */}
        <TextInput
          placeholder="Search patients..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: "#0ea5e9",
            borderRadius: 6,
            backgroundColor: "#fff",
            marginBottom: 12,
          }}
        />

        {/* Add Patient Toggle */}
        <TouchableOpacity
          onPress={() => setShowAddPatient(!showAddPatient)}
          style={{
            padding: 12,
            backgroundColor: "#10b981",
            borderRadius: 6,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {showAddPatient ? "Cancel" : "+ Add Patient"}
          </Text>
        </TouchableOpacity>

        {/* Add Patient Form */}
        {showAddPatient && (
          <View style={{ marginTop: 12, padding: 12, backgroundColor: "#e0f2fe", borderRadius: 6 }}>
            <TextInput
              placeholder="Patient name"
              value={newPatientName}
              onChangeText={setNewPatientName}
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "#0ea5e9",
                borderRadius: 6,
                backgroundColor: "#fff",
                marginBottom: 10,
              }}
            />
            <TouchableOpacity
              onPress={addPatient}
              style={{
                padding: 10,
                backgroundColor: "#0ea5e9",
                borderRadius: 6,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Save Patient</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Patients List */}
      {loading ? (
        <ActivityIndicator size="large" color="#0ea5e9" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredPatients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PatientCard patient={item} />}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
              No patients found
            </Text>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}
```

### Step 5.5: Patient Dashboard Screen

Create `src/screens/PatientDashboard.js`:

```javascript
// src/screens/PatientDashboard.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { patientService } from "../services/api";

export default function PatientDashboard() {
  const [diagnoses, setDiagnoses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const diagRes = await patientService.getDiagnoses();
      const progRes = await patientService.getProgress();

      setDiagnoses(diagRes.diagnoses || []);
      setProgress(progRes.progressEntries || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f0f9ff",
        paddingHorizontal: 16,
        paddingVertical: 20,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#0c4a6e",
        }}
      >
        My Treatment Journey
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0ea5e9" />
      ) : (
        <>
          {/* Diagnoses Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 12,
                color: "#0c4a6e",
              }}
            >
              Recent Diagnoses
            </Text>

            {diagnoses.length > 0 ? (
              diagnoses.map((d, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: "#fff",
                    padding: 12,
                    borderRadius: 6,
                    marginBottom: 10,
                    borderLeftWidth: 4,
                    borderLeftColor: "#0ea5e9",
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#0c4a6e" }}>
                    {d.lesionType || d.diagnosedCondition}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
                    Confidence: {d.confidence}%
                  </Text>
                  {d.timestamp && (
                    <Text style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
                      {new Date(d.timestamp).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={{ color: "#666" }}>No diagnoses recorded yet</Text>
            )}
          </View>

          {/* Progress Section */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 12,
                color: "#0c4a6e",
              }}
            >
              Healing Progress
            </Text>

            {progress.length > 0 ? (
              progress.map((p, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: "#fff",
                    padding: 12,
                    borderRadius: 6,
                    marginBottom: 10,
                    borderLeftWidth: 4,
                    borderLeftColor: "#10b981",
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#0c4a6e" }}>
                    Healing Score: {p.healingScore}%
                  </Text>
                  {p.date && (
                    <Text style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
                      {new Date(p.date).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={{ color: "#666" }}>No progress recorded yet</Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}
```

---

## PHASE 6: NAVIGATION SETUP (30 MINUTES)

### Step 6.1: Create Root Navigator

Create `src/navigation/RootNavigator.js`:

```javascript
// src/navigation/RootNavigator.js
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, View } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import ClinicianDashboard from "../screens/ClinicianDashboard";
import CameraScreen from "../screens/CameraScreen";
import DiagnosisResultScreen from "../screens/DiagnosisResultScreen";
import PatientDashboard from "../screens/PatientDashboard";

import { authService } from "../services/api";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ClinicianTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0ea5e9",
        tabBarInactiveTintColor: "#cbd5e1",
      }}
    >
      <Tab.Screen
        name="PatientsList"
        component={ClinicianDashboard}
        options={{
          tabBarLabel: "Patients",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>👥</Text>,
        }}
      />
      <Tab.Screen
        name="CameraTab"
        component={CameraScreen}
        options={{
          tabBarLabel: "Camera",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📷</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userType, setUserType] = useState("clinician");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const isAuth = await authService.isAuthenticated();
        setIsLoggedIn(isAuth);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          children={() => (
            <LoginScreen
              onLoginSuccess={() => setIsLoggedIn(true)}
              onUserTypeChange={setUserType}
            />
          )}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#0ea5e9",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {userType === "clinician" ? (
        <>
          <Stack.Screen
            name="ClinicianTabs"
            component={ClinicianTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DiagnosisResult"
            component={DiagnosisResultScreen}
            options={{ title: "Diagnosis Result" }}
          />
        </>
      ) : (
        <Stack.Screen
          name="PatientDashboard"
          component={PatientDashboard}
          options={{ title: "My Health" }}
        />
      )}
    </Stack.Navigator>
  );
}
```

---

## PHASE 7: APP ENTRY POINT (15 MINUTES)

### Step 7.1: Main App.js

Create `App.js`:

```javascript
// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
```

### Step 7.2: app.json Configuration

Update `app.json`:

```json
{
  "expo": {
    "name": "SAGAlyze",
    "slug": "sagalyze",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera"
        }
      ]
    ],
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTabletMode": true,
      "requireFullScreen": false
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

---

## PHASE 8: PACKAGE.JSON

Create/Update `package.json`:

```json
{
  "name": "sagalyze",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "axios": "^1.6.0",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/bottom-tabs": "^6.5.0",
    "react-native": "^0.73.0",
    "react": "^18.2.0",
    "expo": "^51.0.0",
    "expo-camera": "^14.0.0",
    "expo-image-picker": "^15.0.0",
    "expo-file-system": "^16.0.0",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "react-native-screens": "^3.29.0",
    "react-native-safe-area-context": "^4.8.0",
    "nativewind": "^2.0.11",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "@babel/core": "^7.23.0"
  }
}
```

---

## PHASE 9: RUNNING THE APP (30 MINUTES)

### Step 9.1: Install Dependencies

```bash
# Inside mobile-app/SAGAlyze
npm install
```

### Step 9.2: Run on Simulator/Emulator

```bash
# Start Expo dev server
npm start

# For Android emulator (press 'a')
# For iOS simulator (press 'i')
# For web (press 'w')
```

### Step 9.3: Test Flow

**Testing Checklist:**
- [ ] App starts and shows login screen
- [ ] Login with demo credentials works
- [ ] Can switch between Clinician/Patient mode
- [ ] Clinician dashboard shows patients list
- [ ] Can add new patient
- [ ] Camera screen loads
- [ ] Can take photo
- [ ] ML prediction works (mock or real)
- [ ] Diagnosis result displays correctly
- [ ] Can save diagnosis to backend
- [ ] Patient dashboard shows diagnoses

---

## MODIFICATIONS GUIDE: HOW TO UPDATE THIS LATER

### To Change Backend URL:
```javascript
// In config.js
BACKEND_URL: "https://your-real-backend.com/api"
```

### To Change API Endpoints:
```javascript
// In config.js, update ENDPOINTS object
ENDPOINTS: {
  auth: {
    login: "/your-custom-auth/login",  // Change this
    // ...
  }
}
```

### To Use Real TFLite Model:
```javascript
// Step 1: Replace model file
// Place new .tflite file in mobile-app/assets/models/

// Step 2: Update modelConfig.js
// Change input/output specs and class labels

// Step 3: In CameraScreen.js, change:
// FROM: const prediction = await mockInference(photo.uri);
// TO: const prediction = await inferenceEngine.predict(photo.uri);
```

### To Add New Patient Fields:
```javascript
// In ClinicianDashboard.js, add to addPatient():
await clinicianService.addPatient({
  name: newPatientName,
  fitzpatrickType: newPatientFitzpatrick,
  age: newPatientAge,  // Add new field
  gender: newPatientGender,  // Add new field
  // ...
});
```

---

## SUBMISSION CHECKLIST

- [ ] Backend is running and accessible
- [ ] Mobile app builds without errors
- [ ] App connects to backend successfully
- [ ] Login flow works
- [ ] Camera captures images
- [ ] ML predictions display
- [ ] Diagnoses save to backend
- [ ] GitHub repo has clean commit history
- [ ] README.md documents setup steps
- [ ] Demo video (1-2 min) recorded
- [ ] Presentation slides (3-5) created

---

## KEY CONTACTS / NEXT STEPS

**After this MVP is working, provide:**
1. Real backend URL
2. Actual API endpoint paths
3. Real TFLite model file
4. Updated class labels
5. Any additional patient data fields

**Then update:**
- config.js with real backend details
- modelConfig.js with real model specs
- Replace mock inference with real model
- Add database persistence (optional)
- Polish UI/UX (optional)

---

**Estimated Time to Working MVP: 4-6 hours**
**Estimated Time to Production Ready: 12-24 hours**

---

