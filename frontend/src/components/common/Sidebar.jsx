// // import { NavLink } from 'react-router-dom';
// // import { 
// //   LayoutDashboard, 
// //   Users, 
// //   Activity, 
// //   Info, 
// //   Settings as SettingsIcon,
// //   Coffee 
// // } from 'lucide-react';

// // const navigation = [
// //   { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
// //   { name: 'Patients', to: '/patients', icon: Users },
// //   { name: 'Daily Huddle', to: '/huddle', icon: Coffee },
// //   { name: 'Detection AI', to: '/detection', icon: Activity },
// //   { name: 'Model Info', to: '/model-info', icon: Info },
// //   { name: 'Settings', to: '/settings', icon: SettingsIcon },
// // ];

// // export default function Sidebar() {
// //   return (
// //     <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
// //       <div className="p-6 border-b border-gray-200">
// //         <div className="flex items-center gap-3">
// //           <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
// //             <Activity className="w-6 h-6 text-white" />
// //           </div>
// //           <div>
// //             <h1 className="text-xl font-bold text-gray-900">SkinAlyze</h1>
// //             <p className="text-xs text-gray-500">Dermatology AI</p>
// //           </div>
// //         </div>
// //       </div>

// //       <nav className="flex-1 p-4 space-y-1">
// //         {navigation.map((item) => (
// //           <NavLink
// //             key={item.name}
// //             to={item.to}
// //             className={({ isActive }) =>
// //               `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
// //                 isActive
// //                   ? 'bg-primary-50 text-primary-700'
// //                   : 'text-gray-600 hover:bg-gray-50'
// //               }`
// //             }
// //           >
// //             <item.icon className="w-5 h-5" />
// //             <span className="font-medium">{item.name}</span>
// //           </NavLink>
// //         ))}
// //       </nav>

// //       <div className="p-4 border-t border-gray-200">
// //         <div className="flex items-center gap-3 px-4 py-3">
// //           <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
// //           <div className="flex-1 min-w-0">
// //             <p className="text-sm font-medium text-gray-900 truncate">
// //               Dr. Clinician
// //             </p>
// //             <p className="text-xs text-gray-500 truncate">
// //               Dermatologist
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </aside>
// //   );
// // }
// import { NavLink } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Users, 
//   Activity, 
//   Info, 
//   Settings as SettingsIcon,
//   Coffee,
//   LogOut
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// const navigation = [
//   { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
//   { name: 'Patients', to: '/patients', icon: Users },
//   { name: 'Daily Huddle', to: '/huddle', icon: Coffee },
//   { name: 'Detection AI', to: '/detection', icon: Activity },
//   { name: 'Model Info', to: '/model-info', icon: Info },
//   { name: 'Settings', to: '/settings', icon: SettingsIcon },
// ];

// export default function Sidebar() {
//   const { clinician, logout } = useAuth();

//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
//             <Activity className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-gray-900">SkinAlyze</h1>
//             <p className="text-xs text-gray-500">Dermatology AI</p>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//         {navigation.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.to}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                 isActive
//                   ? 'bg-primary-50 text-primary-700'
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`
//             }
//           >
//             <item.icon className="w-5 h-5" />
//             <span className="font-medium">{item.name}</span>
//           </NavLink>
//         ))}
//       </nav>

//       <div className="p-4 border-t border-gray-200">
//         <div className="flex items-center gap-3 px-4 py-3 mb-2">
//           <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
//             <span className="text-primary-700 font-semibold text-sm">
//               {clinician?.name?.split(' ').map(n => n[0]).join('') || 'DC'}
//             </span>
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-medium text-gray-900 truncate">
//               {clinician?.name || 'Dr. Clinician'}
//             </p>
//             <p className="text-xs text-gray-500 truncate">
//               Dermatologist
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={logout}
//           className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
//         >
//           <LogOut className="w-4 h-4" />
//           <span className="text-sm font-medium">Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  Info, 
  Settings as SettingsIcon,
  Coffee,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Patients', to: '/patients', icon: Users },
  { name: 'Daily Huddle', to: '/huddle', icon: Coffee },
  { name: 'Detection AI', to: '/detection', icon: Activity },
  { name: 'Model Info', to: '/model-info', icon: Info },
  { name: 'Settings', to: '/settings', icon: SettingsIcon },
];

export default function Sidebar({ onClose }) {
  const { clinician, logout } = useAuth();

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">SkinAlyze</h1>
            <p className="text-xs text-gray-500">Dermatology AI</p>
          </div>
        </div>
        {/* Close button for mobile */}
        <button 
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-700 font-semibold text-sm">
              {clinician?.name?.split(' ').map(n => n[0]).join('') || 'DC'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {clinician?.name || 'Dr. Clinician'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              Dermatologist
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            if (onClose) onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
