import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export default function ProgressTracking() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to={`/patients/${id}`} className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>
          <p className="text-gray-600 mt-1">Longitudinal monitoring and comparison</p>
        </div>
      </div>

      <div className="card text-center py-12">
        <p className="text-gray-500">Progress tracking feature coming soon</p>
        <p className="text-sm text-gray-400 mt-2">
          This will include before/after comparison, heatmaps, and metric visualization
        </p>
      </div>
    </div>
  );
}
