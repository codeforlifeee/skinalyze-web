import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

export default function PatientCard({ patient }) {
  const statusColors = {
    active: 'bg-green-100 text-green-700',
    urgent: 'bg-red-100 text-red-700',
    inactive: 'bg-gray-100 text-gray-700',
  };

  return (
    <Link
      to={`/patients/${patient.id}`}
      className="card hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-700 font-semibold">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-600">Age: {patient.age} • {patient.gender}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[patient.status]}`}>
          {patient.status}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-4 h-4" />
          <span>Fitzpatrick Type: {patient.fitzpatrickType}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Last Visit: {format(new Date(patient.lastVisit), 'MMM dd, yyyy')}</span>
        </div>
        {patient.condition && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">Current Condition</p>
            <p className="font-medium text-gray-900">{patient.condition}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
