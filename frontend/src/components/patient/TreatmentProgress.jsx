import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function TreatmentProgress({ progressEntries = [] }) {
  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getProgressTextColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <Minus className="w-5 h-5 text-gray-600" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  // Mock data if none provided
  const defaultProgress = [
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

  const entries = progressEntries.length > 0 ? progressEntries : defaultProgress;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Treatment Progress</h3>
        <p className="text-sm text-gray-600">Tracking recovery over time</p>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <div 
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {entry.title || 'Healing Progress'}
                </h4>
                <p className="text-sm text-gray-600">
                  {formatDate(entry.date || new Date())}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className={`text-3xl font-bold ${getProgressTextColor(entry.score)}`}>
                  {entry.score}%
                </div>
                {entry.trend && getTrendIcon(entry.trend)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(entry.score)} transition-all duration-500 rounded-full`}
                  style={{ width: `${entry.score}%` }}
                />
              </div>
            </div>

            {/* Notes */}
            {entry.notes && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  {entry.notes}
                </p>
              </div>
            )}

            {/* Additional Metrics if available */}
            {entry.metrics && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {Object.entries(entry.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      {entries.length > 1 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            <div>
              <h4 className="font-semibold text-primary-900">Overall Progress</h4>
              <p className="text-sm text-primary-700">
                {entries[entries.length - 1].score - entries[0].score > 0 
                  ? `Improving by ${entries[entries.length - 1].score - entries[0].score}% since first observation`
                  : 'Stable condition, continue monitoring'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
