// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor for auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// // Patient API
// export const patientAPI = {
//   getAll: () => api.get('/patients'),
//   getById: (id) => api.get(`/patients/${id}`),
//   create: (data) => api.post('/patients', data),
//   update: (id, data) => api.put(`/patients/${id}`, data),
//   delete: (id) => api.delete(`/patients/${id}`),
//   search: (query) => api.get(`/patients/search?q=${query}`),
// };

// // Analysis API
// export const analysisAPI = {
//   classify: (formData) => api.post('/analysis/classify', formData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }),
//   getByPatient: (patientId) => api.get(`/analysis/patient/${patientId}`),
//   getExplainability: (imageId) => api.get(`/analysis/explainability/${imageId}`),
// };

// // Tracking API
// export const trackingAPI = {
//   getProgress: (patientId) => api.get(`/tracking/progress/${patientId}`),
//   compareVisits: (visitId1, visitId2) => api.get(`/tracking/compare/${visitId1}/${visitId2}`),
//   getMetrics: (patientId) => api.get(`/tracking/metrics/${patientId}`),
// };

// // Sharing API
// export const sharingAPI = {
//   createSummary: (patientId, data) => api.post(`/sharing/summary/${patientId}`, data),
//   getSummary: (summaryId) => api.get(`/sharing/summary/${summaryId}`),
//   generatePDF: (summaryId) => api.get(`/sharing/pdf/${summaryId}`, { responseType: 'blob' }),
// };

// // Mock data for development
// export const getMockPatients = () => Promise.resolve({
//   data: [
//     {
//       id: '1',
//       name: 'John Doe',
//       age: 34,
//       gender: 'Male',
//       status: 'active',
//       lastVisit: '2025-11-01',
//       condition: 'Eczema',
//       fitzpatrickType: 'III',
//     },
//     {
//       id: '2',
//       name: 'Jane Smith',
//       age: 28,
//       gender: 'Female',
//       status: 'urgent',
//       lastVisit: '2025-11-05',
//       condition: 'Acne',
//       fitzpatrickType: 'IV',
//     },
//     {
//       id: '3',
//       name: 'Michael Johnson',
//       age: 45,
//       gender: 'Male',
//       status: 'active',
//       lastVisit: '2025-10-28',
//       condition: 'Psoriasis',
//       fitzpatrickType: 'II',
//     },
//   ],
// });
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Patient API
export const patientAPI = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data),
  update: (id, data) => api.put(`/patients/${id}`, data),
  delete: (id) => api.delete(`/patients/${id}`),
  search: (query) => api.get(`/patients/search?q=${query}`),
};

// Analysis API
export const analysisAPI = {
  classify: (formData) => api.post('/analysis/classify', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getByPatient: (patientId) => api.get(`/analysis/patient/${patientId}`),
  getExplainability: (imageId) => api.get(`/analysis/explainability/${imageId}`),
};

// Tracking API
export const trackingAPI = {
  getProgress: (patientId) => api.get(`/tracking/progress/${patientId}`),
  compareVisits: (visitId1, visitId2) => api.get(`/tracking/compare/${visitId1}/${visitId2}`),
  getMetrics: (patientId) => api.get(`/tracking/metrics/${patientId}`),
};

// Sharing API
export const sharingAPI = {
  createSummary: (patientId, data) => api.post(`/sharing/summary/${patientId}`, data),
  getSummary: (summaryId) => api.get(`/sharing/summary/${summaryId}`),
  generatePDF: (summaryId) => api.get(`/sharing/pdf/${summaryId}`, { responseType: 'blob' }),
};

// Mock data for development
export const getMockPatients = () => {
  // Return from localStorage if available
  const storedPatients = localStorage.getItem('mockPatients');
  if (storedPatients) {
    return Promise.resolve({ data: JSON.parse(storedPatients) });
  }

  // Default mock data
  const mockPatients = [
    {
      id: '1',
      name: 'John Doe',
      age: 34,
      gender: 'Male',
      status: 'active',
      lastVisit: '2025-11-01',
      condition: 'Eczema',
      fitzpatrickType: 'III',
      email: 'john.doe@email.com',
      phone: '+91 98765 43210',
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 28,
      gender: 'Female',
      status: 'urgent',
      lastVisit: '2025-11-05',
      condition: 'Acne',
      fitzpatrickType: 'IV',
      email: 'jane.smith@email.com',
      phone: '+91 98765 43211',
    },
    {
      id: '3',
      name: 'Michael Johnson',
      age: 45,
      gender: 'Male',
      status: 'active',
      lastVisit: '2025-10-28',
      condition: 'Psoriasis',
      fitzpatrickType: 'II',
      email: 'michael.j@email.com',
      phone: '+91 98765 43212',
    },
    {
      id: '4',
      name: 'Emily Davis',
      age: 32,
      gender: 'Female',
      status: 'active',
      lastVisit: '2025-11-03',
      condition: 'Vitiligo',
      fitzpatrickType: 'V',
      email: 'emily.d@email.com',
      phone: '+91 98765 43213',
    },
    {
      id: '5',
      name: 'Robert Wilson',
      age: 52,
      gender: 'Male',
      status: 'inactive',
      lastVisit: '2025-09-15',
      condition: 'Benign nevus',
      fitzpatrickType: 'I',
      email: 'robert.w@email.com',
      phone: '+91 98765 43214',
    },
  ];

  // Store in localStorage
  localStorage.setItem('mockPatients', JSON.stringify(mockPatients));

  return Promise.resolve({ data: mockPatients });
};

// Get single patient by ID
export const getMockPatientById = (id) => {
  return getMockPatients().then(response => {
    const patient = response.data.find(p => p.id === id);
    return { data: patient };
  });
};

// Add new patient
export const addMockPatient = (patientData) => {
  return getMockPatients().then(response => {
    const patients = response.data;
    const newPatient = {
      ...patientData,
      id: (patients.length + 1).toString(),
      status: 'active',
      lastVisit: new Date().toISOString().split('T')[0],
    };
    patients.push(newPatient);
    localStorage.setItem('mockPatients', JSON.stringify(patients));
    return { data: newPatient };
  });
};

// Update patient
export const updateMockPatient = (id, updates) => {
  return getMockPatients().then(response => {
    const patients = response.data;
    const index = patients.findIndex(p => p.id === id);
    if (index !== -1) {
      patients[index] = { ...patients[index], ...updates };
      localStorage.setItem('mockPatients', JSON.stringify(patients));
      return { data: patients[index] };
    }
    return { data: null };
  });
};

// Delete patient
export const deleteMockPatient = (id) => {
  return getMockPatients().then(response => {
    const patients = response.data.filter(p => p.id !== id);
    localStorage.setItem('mockPatients', JSON.stringify(patients));
    return { data: { success: true } };
  });
};

// Get visits for a patient
export const getPatientVisits = (patientId) => {
  const visits = JSON.parse(localStorage.getItem('visits') || '[]');
  const patientVisits = visits.filter(v => v.patientId === patientId);
  return Promise.resolve({ data: patientVisits });
};

// ML Analysis function
export async function analyzeSkinImageAPI(imageFile, patientId = null) {
  const formData = new FormData();
  formData.append('file', imageFile);
  if (patientId) formData.append('patient_id', patientId);

  try {
    const url = `${API_BASE_URL}/analysis/classify`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Analyze request failed (${response.status}): ${text}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Analyze API call failed:', error);
    throw error;
  }
}
