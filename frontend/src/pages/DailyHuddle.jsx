import { Coffee, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function DailyHuddle() {
  const todaysTasks = [
    { id: 1, patient: 'John Doe', type: 'Follow-up', time: '10:00 AM', status: 'pending' },
    { id: 2, patient: 'Jane Smith', type: 'New Analysis', time: '11:30 AM', status: 'urgent' },
    { id: 3, patient: 'Michael Johnson', type: 'Review Results', time: '2:00 PM', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Coffee className="w-8 h-8 text-primary-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Huddle</h1>
          <p className="text-gray-600">{format(new Date(), 'EEEE, MMMM dd, yyyy')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Tasks</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Urgent Cases</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">2</p>
            </div>
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
        <div className="space-y-3">
          {todaysTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-semibold text-sm">
                    {task.patient.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{task.patient}</p>
                  <p className="text-sm text-gray-600">{task.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{task.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.status === 'completed' ? 'bg-green-100 text-green-700' :
                  task.status === 'urgent' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
