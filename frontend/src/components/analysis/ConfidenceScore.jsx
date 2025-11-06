export default function ConfidenceScore({ score }) {
  const percentage = (score * 100).toFixed(1);
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-900">{percentage}%</span>
    </div>
  );
}
