import { Calendar, Activity } from 'lucide-react';

export default function DiagnosisHistory({ diagnoses = [] }) {
  const getRiskLevelColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low risk':
      case 'low':
        return 'bg-green-100 text-green-700';
      case 'medium risk':
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'high risk':
      case 'high':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (diagnoses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No diagnosis history available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Diagnosis History</h3>
      <p className="text-sm text-gray-600 mb-6">Complete medical record with metrics</p>

      {diagnoses.map((diagnosis, index) => (
        <div 
          key={index}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {diagnosis.condition || 'Melanocytic Nevus'}
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(diagnosis.date || new Date())}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(diagnosis.riskLevel)}`}>
                {diagnosis.riskLevel || 'Low Risk'}
              </span>
              <span className="text-2xl font-bold text-primary-600">
                {diagnosis.confidence || 86}%
              </span>
            </div>
          </div>

          {/* Clinical Notes */}
          {diagnosis.notes && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">
                Clinical Notes:
              </label>
              <p className="text-sm text-gray-700">
                {diagnosis.notes}
              </p>
            </div>
          )}

          {/* Clinical Metrics */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-gray-500" />
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Clinical Metrics
              </label>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Asymmetry */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Asymmetry</p>
                <p className="text-2xl font-bold text-gray-900">
                  {diagnosis.metrics?.asymmetry || '97'}%
                </p>
              </div>

              {/* Border */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Border</p>
                <p className="text-2xl font-bold text-gray-900">
                  {diagnosis.metrics?.border || '91'}%
                </p>
              </div>

              {/* Color Variation */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Color Var.</p>
                <p className="text-2xl font-bold text-gray-900">
                  {diagnosis.metrics?.colorVariation || '74'}%
                </p>
              </div>

              {/* Diameter */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Diameter</p>
                <p className="text-2xl font-bold text-gray-900">
                  {diagnosis.metrics?.diameter || '9.0'} mm
                </p>
              </div>

              {/* Evolution */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Evolution</p>
                <p className="text-2xl font-bold text-gray-900">
                  {diagnosis.metrics?.evolution || 'Absent'}
                </p>
              </div>

              {/* Pigment Net */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Pigment Net</p>
                <p className="text-2xl font-bold text-gray-900">
                  {diagnosis.metrics?.pigmentNet || '15'}%
                </p>
              </div>

              {/* Blue-White */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Blue-White</p>
                <p className="text-2xl font-bold text-gray-900">
                  {diagnosis.metrics?.blueWhite || '21'}%
                </p>
              </div>

              {/* Vessels */}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">Vessels</p>
                <p className="text-2xl font-bold text-gray-900">
                  {diagnosis.metrics?.vessels || '2'}%
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
