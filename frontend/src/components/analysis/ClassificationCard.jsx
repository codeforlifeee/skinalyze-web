import { CheckCircle } from 'lucide-react';

export default function ClassificationCard({ rank, condition, confidence, category }) {
  const confidencePercent = (confidence * 100).toFixed(1);
  
  const rankColors = {
    1: 'border-primary-500 bg-primary-50',
    2: 'border-gray-300 bg-gray-50',
    3: 'border-gray-200 bg-white',
  };

  return (
    <div className={`border-2 ${rankColors[rank]} rounded-lg p-4`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {rank === 1 && <CheckCircle className="w-5 h-5 text-primary-600" />}
            <span className="text-xs font-medium text-gray-500">Rank #{rank}</span>
          </div>
          <h4 className="font-semibold text-gray-900">{condition}</h4>
          <p className="text-sm text-gray-600">{category}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{confidencePercent}%</div>
          <div className="text-xs text-gray-500">confidence</div>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${rank === 1 ? 'bg-primary-600' : 'bg-gray-400'}`}
            style={{ width: `${confidencePercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
