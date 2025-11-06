import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Activity, Share2, TrendingUp } from 'lucide-react';
import { getMockPatients } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function PatientDetail() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatient();
  }, [id]);

  const loadPatient = async () => {
    try {
      const response = await getMockPatients();
      const foundPatient = response.data.find(p => p.id === id);
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
      <div className="flex items-center gap-4">
        <Link to="/patients" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
          <p className="text-gray-600">Patient Details</p>
        </div>
        <div className="flex gap-3">
          <Link to={`/patients/${id}/analyze`} className="btn-primary flex items-center gap-2">
            <Activity className="w-5 h-5" />
            New Analysis
          </Link>
          <Link to={`/patients/${id}/progress`} className="btn-secondary flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Progress
          </Link>
          <Link to={`/patients/${id}/share`} className="btn-secondary flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="card">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-700 font-bold text-3xl">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
              <p className="text-gray-600 mt-1">{patient.age} years old • {patient.gender}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  patient.status === 'active' ? 'bg-green-100 text-green-700' :
                  patient.status === 'urgent' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {patient.status}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Fitzpatrick Type</span>
                <span className="font-medium text-gray-900">{patient.fitzpatrickType}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Current Condition</span>
                <span className="font-medium text-gray-900">{patient.condition}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Last Visit</span>
                <span className="font-medium text-gray-900">{patient.lastVisit}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Chief Complaint</label>
                <p className="text-gray-900 mt-1">Persistent skin lesions on forearm with itching</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Allergies</label>
                <p className="text-gray-900 mt-1">None reported</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Current Medications</label>
                <p className="text-gray-900 mt-1">Topical corticosteroids as needed</p>
              </div>
            </div>
          </div>

          <div className="card mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Visits</h3>
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No visits recorded yet</p>
              <Link to={`/patients/${id}/analyze`} className="text-primary-600 hover:underline text-sm mt-2 inline-block">
                Create first analysis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
