import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  LogOut, 
  FileText, 
  TrendingUp, 
  Calendar,
  AlertCircle,
  Activity,
  Lightbulb
} from 'lucide-react'

export default function PatientHealthJourney() {
  const { clinician: user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('diagnoses')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Mock diagnosis data
  const diagnosis = {
    condition: 'Melanocytic Nevus',
    riskLevel: 'Low Risk',
    confidence: 86,
    date: 'October 30, 2025',
    notes: 'Benign-appearing nevus. Advise routine monitoring.',
    metrics: {
      asymmetry: { value: 97, label: 'Asymmetry' },
      border: { value: 91, label: 'Border' },
      colorVariation: { value: 74, label: 'Color Var.' },
      diameter: { value: '9.0 mm', label: 'Diameter' },
      evolution: { value: 'Absent', label: 'Evolution' },
      pigmentNet: { value: 15, label: 'Pigment Net.' },
      blueWhite: { value: 21, label: 'Blue-White' },
      vessels: { value: 2, label: 'Vessels' }
    }
  }

  const progressData = [
    { date: 'Nov 7', score: 78, label: 'Current' },
    { date: 'Nov 4', score: 74, label: 'Improving' },
    { date: 'Oct 31', score: 65, label: 'Baseline' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary-600">SAGAIyze - Patient</h1>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Health Journey</h2>
          <p className="text-gray-600">Track your diagnosis and recovery</p>
        </div>

        {/* Tabs */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-1 mb-8 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('diagnoses')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'diagnoses'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Diagnoses</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'diagnoses' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'progress'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Progress</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
            }`}>
              {progressData.length}
            </span>
          </button>
        </div>

        {/* Diagnoses Tab Content */}
        {activeTab === 'diagnoses' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Diagnoses</h3>
              <p className="text-sm text-gray-600 mb-6">Your diagnosis history from healthcare providers</p>
            </div>

            {/* Diagnosis Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{diagnosis.condition}</h4>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                        {diagnosis.riskLevel}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <span className="text-3xl font-bold text-primary-600">{diagnosis.confidence}%</span>
                    </div>
                    <p className="text-xs text-gray-500">Confidence</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{diagnosis.date}</span>
                </div>
              </div>

              {/* Clinical Notes */}
              <div className="p-6 border-b border-gray-200">
                <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Clinical Notes:
                </h5>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{diagnosis.notes}</p>
              </div>

              {/* Clinical Metrics */}
              <div className="p-6">
                <h5 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Clinical Metrics
                </h5>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(diagnosis.metrics).map(([key, metric]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                      <div className="text-lg font-bold text-gray-900">
                        {typeof metric.value === 'number' ? `${metric.value}%` : metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h5 className="font-semibold text-blue-900 mb-1">Need Help?</h5>
                  <p className="text-sm text-blue-700">
                    Contact your healthcare provider for any questions about your diagnosis or treatment plan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab Content */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Healing Progress</h3>
              <p className="text-sm text-gray-600 mb-6">Track your recovery over time</p>
            </div>

            {/* Progress Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h5 className="font-semibold text-gray-900 mb-6">Progress Timeline</h5>
              
              <div className="space-y-4">
                {progressData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-24 text-sm text-gray-600 font-medium">{entry.date}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              entry.score >= 75 ? 'bg-green-500' : entry.score >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${entry.score}%` }}
                          ></div>
                        </div>
                        <span className="text-lg font-bold text-gray-900 w-12">{entry.score}%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-1">{entry.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Info */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h5 className="font-semibold text-green-900 mb-1">Positive Progress</h5>
                  <p className="text-sm text-green-700">
                    Your condition is showing signs of improvement. Continue following your treatment plan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex gap-4">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Important Disclaimer</p>
              <p>
                This information is for reference only. Always consult with your healthcare provider 
                for medical advice, diagnosis, or treatment. If you experience any concerning symptoms, 
                please contact your doctor immediately.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
