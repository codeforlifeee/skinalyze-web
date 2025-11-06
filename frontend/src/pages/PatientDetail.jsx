import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Activity, Share2, TrendingUp, FileText } from 'lucide-react';
import { getMockPatients } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DiagnosisHistory from '../components/patient/DiagnosisHistory';
import TreatmentProgress from '../components/patient/TreatmentProgress';

export default function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('diagnoses'); // 'diagnoses' or 'progress'

  useEffect(() => {
    loadPatient();
  }, [id]);

  const loadPatient = async () => {
    try {
      const response = await getMockPatients();
      const foundPatient = response.data.find(p => p.id === id);
      
      // Add mock diagnosis and progress data
      if (foundPatient) {
        foundPatient.diagnoses = [
          {
            date: 'October 30, 2025 at 04:23 PM',
            condition: 'Melanocytic Nevus',
            riskLevel: 'Low Risk',
            confidence: 86,
            notes: 'Benign-appearing nevus. Advise routine monitoring.',
            metrics: {
              asymmetry: 97,
              border: 91,
              colorVariation: 74,
              diameter: '9.0',
              evolution: 'Absent',
              pigmentNet: 15,
              blueWhite: 21,
              vessels: 2
            }
          }
        ];
        
        foundPatient.progressEntries = [
          {
            date: 'Oct 31, 2025',
            score: 65,
            title: 'Healing Progress',
            notes: 'Post-observation: stable appearance, no alarming changes.',
            trend: 'stable'
          },
          {
            date: 'Nov 4, 2025',
            score: 74,
            title: 'Healing Progress',
            notes: 'Slight improvement in border regularity and color uniformity.',
            trend: 'up'
          }
        ];
      }
      
      setPatient(foundPatient);
    } catch (error) {
      console.error('Failed to load patient:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="large" text="Loading patient..." />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Patient not found</p>
        <Link to="/patients" className="text-primary-600 hover:underline mt-2 inline-block">
          Back to Patients
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/patients" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Patient Details</h1>
        </div>
        <div className="flex gap-3">
          <Link to={`/patients/${id}/analyze`} className="btn-primary flex items-center gap-2">
            <Activity className="w-5 h-5" />
            New Analysis
          </Link>
          <Link to={`/patients/${id}/share`} className="btn-secondary flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </Link>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-2xl">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{patient.name}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span>Patient ID: {patient.id}</span>
              <span>•</span>
              <span>Skin Type: <span className="font-medium text-primary-600">Type {patient.fitzpatrickType}</span></span>
            </div>
            <p className="text-sm text-gray-500">Patient since November 2025</p>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {patient.diagnoses?.length || 1}
              </div>
              <div className="text-sm text-gray-600">Diagnoses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {patient.progressEntries?.length || 2}
              </div>
              <div className="text-sm text-gray-600">Progress Entries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {patient.highRiskCount || 0}
              </div>
              <div className="text-sm text-gray-600">High Risk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('diagnoses')}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors relative ${
            activeTab === 'diagnoses'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="w-5 h-5" />
          Diagnoses
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
            activeTab === 'diagnoses' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {patient.diagnoses?.length || 1}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors relative ${
            activeTab === 'progress'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          Progress
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
            activeTab === 'progress' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {patient.progressEntries?.length || 2}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'diagnoses' && (
          <DiagnosisHistory diagnoses={patient.diagnoses} />
        )}
        {activeTab === 'progress' && (
          <TreatmentProgress progressEntries={patient.progressEntries} />
        )}
      </div>
    </div>
  );
}
