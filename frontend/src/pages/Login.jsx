// // import { useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import { Activity, Shield, Zap, Users } from 'lucide-react';

// // export default function Login() {
// //   const { login, isAuthenticated, isLoading } = useAuth();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       navigate('/dashboard');
// //     }
// //   }, [isAuthenticated, navigate]);

// //   const features = [
// //     {
// //       icon: Activity,
// //       title: 'AI-Assisted Diagnosis',
// //       description: '537 dermatologic conditions with calibrated confidence scores',
// //     },
// //     {
// //       icon: Zap,
// //       title: 'Instant Analysis',
// //       description: 'Under 300ms inference time with offline-first capability',
// //     },
// //     {
// //       icon: Users,
// //       title: 'Progress Tracking',
// //       description: 'Longitudinal monitoring with heatmaps and metric visualization',
// //     },
// //     {
// //       icon: Shield,
// //       title: 'Fairness First',
// //       description: 'Validated across all Fitzpatrick skin types I-VI',
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen flex">
// //       {/* Left Side - Branding */}
// //       <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 flex-col justify-between">
// //         <div>
// //           <div className="flex items-center gap-3 text-white mb-12">
// //             <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
// //               <Activity className="w-7 h-7" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl font-bold">SkinAlyze</h1>
// //               <p className="text-primary-100 text-sm">Smart Dermatology Assistant</p>
// //             </div>
// //           </div>

// //           <div className="space-y-8">
// //             {features.map((feature, index) => (
// //               <div key={index} className="flex gap-4 text-white">
// //                 <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
// //                   <feature.icon className="w-6 h-6" />
// //                 </div>
// //                 <div>
// //                   <h3 className="font-semibold mb-1">{feature.title}</h3>
// //                   <p className="text-primary-100 text-sm">{feature.description}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="text-primary-100 text-sm">
// //           <p>© 2025 SkinAlyze. All rights reserved.</p>
// //           <p className="mt-2">Clinician-only platform for dermatologic care</p>
// //         </div>
// //       </div>

// //       {/* Right Side - Login */}
// //       <div className="flex-1 flex items-center justify-center p-8">
// //         <div className="w-full max-w-md">
// //           <div className="lg:hidden mb-8">
// //             <div className="flex items-center gap-3 mb-2">
// //               <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
// //                 <Activity className="w-6 h-6 text-white" />
// //               </div>
// //               <h1 className="text-2xl font-bold text-gray-900">SkinAlyze</h1>
// //             </div>
// //             <p className="text-gray-600">Smart Dermatology Assistant</p>
// //           </div>

// //           <div className="card">
// //             <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
// //             <p className="text-gray-600 mb-8">Sign in to access the dermatology platform</p>

// //             <button
// //               onClick={() => login()}
// //               disabled={isLoading}
// //               className="w-full btn-primary py-3 text-lg"
// //             >
// //               {isLoading ? 'Loading...' : 'Sign In with Auth0'}
// //             </button>

// //             <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
// //               <div className="flex gap-2">
// //                 <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0" />
// //                 <div>
// //                   <p className="text-sm font-medium text-yellow-800">Clinician Access Only</p>
// //                   <p className="text-xs text-yellow-700 mt-1">
// //                     This platform is restricted to verified healthcare professionals only.
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-6 text-center text-sm text-gray-600">
// //               <p>For demo purposes, you can proceed without authentication.</p>
// //               <button
// //                 onClick={() => navigate('/dashboard')}
// //                 className="text-primary-600 hover:underline mt-2"
// //               >
// //                 Continue as Demo User
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Activity, Shield, Zap, Users } from 'lucide-react';
// import toast from 'react-hot-toast';

// export default function Login() {
//   const { login, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     specialty: 'Dermatology',
//   });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/dashboard');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!formData.name || !formData.email) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     login({
//       id: Date.now().toString(),
//       name: formData.name,
//       email: formData.email,
//       specialty: formData.specialty,
//     });

//     toast.success('Login successful!');
//     navigate('/dashboard');
//   };

//   const handleDemoLogin = () => {
//     login(); // Use default demo user
//     toast.success('Logged in as demo user');
//     navigate('/dashboard');
//   };

//   const features = [
//     {
//       icon: Activity,
//       title: 'AI-Assisted Diagnosis',
//       description: '537 dermatologic conditions with calibrated confidence scores',
//     },
//     {
//       icon: Zap,
//       title: 'Instant Analysis',
//       description: 'Under 300ms inference time with offline-first capability',
//     },
//     {
//       icon: Users,
//       title: 'Progress Tracking',
//       description: 'Longitudinal monitoring with heatmaps and metric visualization',
//     },
//     {
//       icon: Shield,
//       title: 'Fairness First',
//       description: 'Validated across all Fitzpatrick skin types I-VI',
//     },
//   ];

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Branding */}
//       <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 flex-col justify-between">
//         <div>
//           <div className="flex items-center gap-3 text-white mb-12">
//             <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//               <Activity className="w-7 h-7" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold">SkinAlyze</h1>
//               <p className="text-primary-100 text-sm">Smart Dermatology Assistant</p>
//             </div>
//           </div>

//           <div className="space-y-8">
//             {features.map((feature, index) => (
//               <div key={index} className="flex gap-4 text-white">
//                 <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
//                   <feature.icon className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-1">{feature.title}</h3>
//                   <p className="text-primary-100 text-sm">{feature.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="text-primary-100 text-sm">
//           <p>© 2025 SkinAlyze. All rights reserved.</p>
//           <p className="mt-2">Clinician-only platform for dermatologic care</p>
//         </div>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="flex-1 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           <div className="lg:hidden mb-8">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
//                 <Activity className="w-6 h-6 text-white" />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900">SkinAlyze</h1>
//             </div>
//             <p className="text-gray-600">Smart Dermatology Assistant</p>
//           </div>

//           <div className="card">
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
//             <p className="text-gray-600 mb-6">Sign in to access the dermatology platform</p>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   placeholder="Dr. Jane Smith"
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   placeholder="doctor@hospital.com"
//                   className="input-field"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Specialty
//                 </label>
//                 <select
//                   value={formData.specialty}
//                   onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
//                   className="input-field"
//                 >
//                   <option>Dermatology</option>
//                   <option>General Practice</option>
//                   <option>Internal Medicine</option>
//                 </select>
//               </div>

//               <button type="submit" className="w-full btn-primary py-3">
//                 Sign In
//               </button>
//             </form>

//             <div className="mt-4">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handleDemoLogin}
//                 className="w-full mt-4 btn-secondary py-3"
//               >
//                 Quick Demo Login
//               </button>
//             </div>

//             <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <div className="flex gap-2">
//                 <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium text-yellow-800">Demo Mode</p>
//                   <p className="text-xs text-yellow-700 mt-1">
//                     This is a demo application for hackathon purposes. In production, 
//                     this would be restricted to verified healthcare professionals.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Activity, Shield, Zap, Users } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: 'Dermatology',
  })

  useEffect(() => {
    // Check if already authenticated
    if (isAuthenticated && !isLoggingIn) {
      const from = location.state?.from?.pathname || '/dashboard'
      console.log('Already authenticated, navigating to:', from)
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location, isLoggingIn])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoggingIn(true)
    
    const user = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      specialty: formData.specialty,
    }

    login(user)
    toast.success('Login successful!')
    
    // Small delay before navigation to ensure state is updated
    setTimeout(() => {
      setIsLoggingIn(false)
      navigate('/dashboard', { replace: true })
    }, 100)
  }

  const handleDemoLogin = () => {
    setIsLoggingIn(true)
    
    const demoUser = {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      specialty: 'Dermatology',
    }
    
    login(demoUser)
    toast.success('Logged in as demo user')
    
    // Small delay before navigation
    setTimeout(() => {
      setIsLoggingIn(false)
      navigate('/dashboard', { replace: true })
    }, 100)
  }

  // Show loading if logging in
  if (isLoggingIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Logging in...</p>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: Activity,
      title: 'AI-Assisted Diagnosis',
      description: '537 dermatologic conditions with calibrated confidence scores',
    },
    {
      icon: Zap,
      title: 'Instant Analysis',
      description: 'Under 300ms inference time with offline-first capability',
    },
    {
      icon: Users,
      title: 'Progress Tracking',
      description: 'Longitudinal monitoring with heatmaps and metric visualization',
    },
    {
      icon: Shield,
      title: 'Fairness First',
      description: 'Validated across all Fitzpatrick skin types I-VI',
    },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-white mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SkinAlyze</h1>
              <p className="text-primary-100 text-sm">Smart Dermatology Assistant</p>
            </div>
          </div>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 text-white">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-primary-100 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-primary-100 text-sm">
          <p>© 2025 SkinAlyze. All rights reserved.</p>
          <p className="mt-2">Clinician-only platform for dermatologic care</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">SkinAlyze</h1>
            </div>
            <p className="text-gray-600">Smart Dermatology Assistant</p>
          </div>

          <div className="card bg-white">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
            <p className="text-gray-600 mb-6">Sign in to access the dermatology platform</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. Jane Smith"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="doctor@hospital.com"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty
                </label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="input-field"
                >
                  <option>Dermatology</option>
                  <option>General Practice</option>
                  <option>Internal Medicine</option>
                </select>
              </div>

              <button type="submit" className="w-full btn-primary py-3">
                Sign In
              </button>
            </form>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <button
                onClick={handleDemoLogin}
                className="w-full mt-4 btn-secondary py-3"
              >
                Quick Demo Login
              </button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex gap-2">
                <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Demo Mode</p>
                  <p className="text-xs text-yellow-700 mt-1">
                    This is a demo application. In production, restricted to verified healthcare professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
