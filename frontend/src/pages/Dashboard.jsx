// // import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Users, Activity, Calendar, TrendingUp } from 'lucide-react';
// // import { getPatients, getRecentAnalyses } from '../services/api';

// // export default function Dashboard() {
// //   const [stats, setStats] = useState({
// //     totalPatients: 0,
// //     activePatients: 0,
// //     urgentCases: 0,
// //     analysesLast7Days: 0,
// //   });

// //   const [recentPatients, setRecentPatients] = useState([]);

// //   useEffect(() => {
// //     loadDashboardData();
// //   }, []);

// //   const loadDashboardData = async () => {
// //     try {
// //       const patients = await getPatients();
// //       const analyses = await getRecentAnalyses(7);

// //       setStats({
// //         totalPatients: patients.length,
// //         activePatients: patients.filter(p => p.status === 'active').length,
// //         urgentCases: patients.filter(p => p.status === 'urgent').length,
// //         analysesLast7Days: analyses.length,
// //       });

// //       setRecentPatients(patients.slice(0, 5));
// //     } catch (error) {
// //       console.error('Failed to load dashboard data:', error);
// //     }
// //   };

// //   const statCards = [
// //     { label: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'blue' },
// //     { label: 'Active Cases', value: stats.activePatients, icon: Activity, color: 'green' },
// //     { label: 'Urgent Cases', value: stats.urgentCases, icon: TrendingUp, color: 'red' },
// //     { label: 'Analyses (7 days)', value: stats.analysesLast7Days, icon: Calendar, color: 'purple' },
// //   ];

// //   return (
// //     <div className="space-y-6">
// //       <div>
// //         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
// //         <p className="text-gray-600 mt-1">Welcome back, Dr. Clinician</p>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {statCards.map((stat) => (
// //           <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm text-gray-600">{stat.label}</p>
// //                 <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
// //               </div>
// //               <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
// //                 <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
// //         <div className="p-6 border-b border-gray-200">
// //           <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
// //         </div>
// //         <div className="divide-y divide-gray-200">
// //           {recentPatients.map((patient) => (
// //             <Link
// //               key={patient.id}
// //               to={`/patients/${patient.id}`}
// //               className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
// //             >
// //               <div className="flex items-center gap-4">
// //                 <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
// //                   <span className="text-primary-700 font-semibold">
// //                     {patient.name.split(' ').map(n => n[0]).join('')}
// //                   </span>
// //                 </div>
// //                 <div>
// //                   <p className="font-medium text-gray-900">{patient.name}</p>
// //                   <p className="text-sm text-gray-600">Age: {patient.age} • {patient.gender}</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-4">
// //                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
// //                   patient.status === 'active' ? 'bg-green-100 text-green-700' :
// //                   patient.status === 'urgent' ? 'bg-red-100 text-red-700' :
// //                   'bg-gray-100 text-gray-700'
// //                 }`}>
// //                   {patient.status}
// //                 </span>
// //               </div>
// //             </Link>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Users, Activity, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
// import { getMockPatients } from '../services/api';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import { format } from 'date-fns';

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     totalPatients: 0,
//     activePatients: 0,
//     urgentCases: 0,
//     analysesLast7Days: 0,
//   });
//   const [recentPatients, setRecentPatients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     try {
//       const response = await getMockPatients();
//       const patients = response.data;

//       setStats({
//         totalPatients: patients.length,
//         activePatients: patients.filter(p => p.status === 'active').length,
//         urgentCases: patients.filter(p => p.status === 'urgent').length,
//         analysesLast7Days: 12,
//       });

//       setRecentPatients(patients.slice(0, 5));
//     } catch (error) {
//       console.error('Failed to load dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statCards = [
//     { label: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
//     { label: 'Active Cases', value: stats.activePatients, icon: Activity, color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-600' },
//     { label: 'Urgent Cases', value: stats.urgentCases, icon: TrendingUp, color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-600' },
//     { label: 'Analyses (7 days)', value: stats.analysesLast7Days, icon: Calendar, color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
//   ];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <LoadingSpinner size="large" text="Loading dashboard..." />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//         <p className="text-gray-600 mt-1">Welcome back, Dr. Clinician</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {statCards.map((stat) => (
//           <div key={stat.label} className="card">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">{stat.label}</p>
//                 <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
//               </div>
//               <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
//                 <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="card">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
//           <Link to="/patients" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
//             View All
//             <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//         <div className="space-y-4">
//           {recentPatients.map((patient) => (
//             <Link
//               key={patient.id}
//               to={`/patients/${patient.id}`}
//               className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
//                   <span className="text-primary-700 font-semibold">
//                     {patient.name.split(' ').map(n => n[0]).join('')}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-gray-900">{patient.name}</p>
//                   <p className="text-sm text-gray-600">Age: {patient.age} • {patient.gender}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="text-right">
//                   <p className="text-sm text-gray-900 font-medium">{patient.condition}</p>
//                   <p className="text-xs text-gray-500">{format(new Date(patient.lastVisit), 'MMM dd, yyyy')}</p>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   patient.status === 'active' ? 'bg-green-100 text-green-700' :
//                   patient.status === 'urgent' ? 'bg-red-100 text-red-700' :
//                   'bg-gray-100 text-gray-700'
//                 }`}>
//                   {patient.status}
//                 </span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Activity, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { getMockPatients } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { format } from 'date-fns';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePatients: 0,
    urgentCases: 0,
    analysesLast7Days: 0,
  });
  const [recentPatients, setRecentPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await getMockPatients();
      const patients = response.data;

      setStats({
        totalPatients: patients.length,
        activePatients: patients.filter(p => p.status === 'active').length,
        urgentCases: patients.filter(p => p.status === 'urgent').length,
        analysesLast7Days: 12,
      });

      setRecentPatients(patients.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Patients', value: stats.totalPatients, icon: Users, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
    { label: 'Active Cases', value: stats.activePatients, icon: Activity, bgColor: 'bg-green-100', textColor: 'text-green-600' },
    { label: 'Urgent Cases', value: stats.urgentCases, icon: TrendingUp, bgColor: 'bg-red-100', textColor: 'text-red-600' },
    { label: 'Analyses', value: stats.analysesLast7Days, icon: Calendar, bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="large" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Welcome back, Dr. Clinician</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3">
              <div className="w-full sm:w-auto">
                <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Patients</h2>
          <Link to="/patients" className="text-primary-600 hover:text-primary-700 text-xs sm:text-sm font-medium flex items-center gap-1">
            View All
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {recentPatients.map((patient) => (
            <Link
              key={patient.id}
              to={`/patients/${patient.id}`}
              className="flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-700 font-semibold text-sm">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{patient.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600">Age: {patient.age} • {patient.gender}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4 ml-2">
                <div className="text-right hidden sm:block">
                  <p className="text-xs sm:text-sm text-gray-900 font-medium">{patient.condition}</p>
                  <p className="text-xs text-gray-500">{format(new Date(patient.lastVisit), 'MMM dd')}</p>
                </div>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  patient.status === 'active' ? 'bg-green-100 text-green-700' :
                  patient.status === 'urgent' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {patient.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
