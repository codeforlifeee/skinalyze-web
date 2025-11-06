import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Share2, FileText, TrendingUp, User, Calendar } from 'lucide-react';
import { getMockPatients } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import DiagnosisHistory from '../components/patient/DiagnosisHistory';
import TreatmentProgress from '../components/patient/TreatmentProgress';

export default function PatientDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('diagnoses'); // 'diagnoses' or 'progress'

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
        <LoadingSpinner size="large" text="Loading patient dashboard..." />
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

  const diagnosesCount = patient.diagnoses?.length || 0;
  const progressCount = patient.progressEntries?.length || 0;
  const highRiskCount = patient.diagnoses?.filter(d => 
    d.riskLevel?.toLowerCase().includes('high')
  ).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/patients')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Patient Details</h1>
            </div>
            
            <div className="flex gap-3">
              <Link 
                to={`/patients/${id}/analyze`}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <Activity className="w-4 h-4" />
                New Analysis
              </Link>
              <Link 
                to={`/patients/${id}/share`}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
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
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Patient ID: {patient.id}
                </span>
                <span>•</span>
                <span>Skin Type: <span className="font-medium text-primary-600">Type {patient.fitzpatrickType}</span></span>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Patient since November 2025
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {diagnosesCount}
                </div>
                <div className="text-sm text-blue-700 font-medium">Diagnoses</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {progressCount}
                </div>
                <div className="text-sm text-green-700 font-medium">Progress Entries</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-100">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {highRiskCount}
                </div>
                <div className="text-sm text-orange-700 font-medium">High Risk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-lg border border-gray-200 border-b-0">
          <div className="flex gap-2 px-6">
            <button
              onClick={() => setActiveView('diagnoses')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all relative ${
                activeView === 'diagnoses'
                  ? 'text-primary-600 border-b-3 border-primary-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-5 h-5" />
              Diagnoses
              <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                activeView === 'diagnoses' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {diagnosesCount}
              </span>
            </button>
            <button
              onClick={() => setActiveView('progress')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all relative ${
                activeView === 'progress'
                  ? 'text-primary-600 border-b-3 border-primary-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Progress
              <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                activeView === 'progress' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {progressCount}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-lg border border-gray-200 p-6 min-h-[600px]">
          {activeView === 'diagnoses' && (
            <DiagnosisHistory diagnoses={patient.diagnoses} />
          )}
          {activeView === 'progress' && (
            <TreatmentProgress progressEntries={patient.progressEntries} />
          )}
        </div>
      </div>
    </div>
  );
}
