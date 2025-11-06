// // // // // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // // // // import { Auth0Provider } from '@auth0/auth0-react';
// // // // // // import { Toaster } from 'react-hot-toast';
// // // // // // import { AuthProvider } from './context/AuthContext';
// // // // // // import ProtectedRoute from './components/auth/ProtectedRoute';
// // // // // // import Sidebar from './components/common/Sidebar';
// // // // // // import Navbar from './components/common/Navbar';
// // // // // // import DisclaimerBanner from './components/common/DisclaimerBanner';

// // // // // // // Pages
// // // // // // import Login from './pages/Login';
// // // // // // import Dashboard from './pages/Dashboard';
// // // // // // import PatientList from './pages/PatientList';
// // // // // // import PatientDetail from './pages/PatientDetail';
// // // // // // import AnalysisView from './pages/AnalysisView';
// // // // // // import ProgressTracking from './pages/ProgressTracking';
// // // // // // import ShareSummary from './pages/ShareSummary';
// // // // // // import ModelInfo from './pages/ModelInfo';
// // // // // // import Settings from './pages/Settings';

// // // // // // function App() {
// // // // // //   return (
// // // // // //     <Auth0Provider
// // // // // //       domain={import.meta.env.VITE_AUTH0_DOMAIN}
// // // // // //       clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
// // // // // //       authorizationParams={{
// // // // // //         redirect_uri: window.location.origin,
// // // // // //         audience: import.meta.env.VITE_AUTH0_AUDIENCE,
// // // // // //       }}
// // // // // //     >
// // // // // //       <AuthProvider>
// // // // // //         <Router>
// // // // // //           <div className="min-h-screen bg-gray-50">
// // // // // //             <Toaster position="top-right" />
            
// // // // // //             <Routes>
// // // // // //               <Route path="/login" element={<Login />} />
              
// // // // // //               <Route
// // // // // //                 path="/*"
// // // // // //                 element={
// // // // // //                   <ProtectedRoute>
// // // // // //                     <div className="flex h-screen overflow-hidden">
// // // // // //                       <Sidebar />
// // // // // //                       <div className="flex-1 flex flex-col overflow-hidden">
// // // // // //                         <Navbar />
// // // // // //                         <DisclaimerBanner />
// // // // // //                         <main className="flex-1 overflow-y-auto p-6">
// // // // // //                           <Routes>
// // // // // //                             <Route path="/" element={<Navigate to="/dashboard" replace />} />
// // // // // //                             <Route path="/dashboard" element={<Dashboard />} />
// // // // // //                             <Route path="/patients" element={<PatientList />} />
// // // // // //                             <Route path="/patients/:id" element={<PatientDetail />} />
// // // // // //                             <Route path="/patients/:id/analyze" element={<AnalysisView />} />
// // // // // //                             <Route path="/patients/:id/progress" element={<ProgressTracking />} />
// // // // // //                             <Route path="/patients/:id/share" element={<ShareSummary />} />
// // // // // //                             <Route path="/model-info" element={<ModelInfo />} />
// // // // // //                             <Route path="/settings" element={<Settings />} />
// // // // // //                           </Routes>
// // // // // //                         </main>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </ProtectedRoute>
// // // // // //                 }
// // // // // //               />
// // // // // //             </Routes>
// // // // // //           </div>
// // // // // //         </Router>
// // // // // //       </AuthProvider>
// // // // // //     </Auth0Provider>
// // // // // //   );
// // // // // // }

// // // // // // export default App;
// // // // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // // // import { Auth0Provider } from '@auth0/auth0-react';
// // // // // import { Toaster } from 'react-hot-toast';
// // // // // import { AuthProvider } from './context/AuthContext';
// // // // // import ProtectedRoute from './components/auth/ProtectedRoute';
// // // // // import Layout from './components/layout/Layout';

// // // // // // Pages
// // // // // import Login from './pages/Login';
// // // // // import Dashboard from './pages/Dashboard';
// // // // // import PatientList from './pages/PatientList';
// // // // // import PatientDetail from './pages/PatientDetail';
// // // // // import AnalysisView from './pages/AnalysisView';
// // // // // import ProgressTracking from './pages/ProgressTracking';
// // // // // import ShareSummary from './pages/ShareSummary';
// // // // // import ModelInfo from './pages/ModelInfo';
// // // // // import Settings from './pages/Settings';

// // // // // function App() {
// // // // //   return (
// // // // //     <Auth0Provider
// // // // //       domain={import.meta.env.VITE_AUTH0_DOMAIN || 'demo.auth0.com'}
// // // // //       clientId={import.meta.env.VITE_AUTH0_CLIENT_ID || 'demo-client-id'}
// // // // //       authorizationParams={{
// // // // //         redirect_uri: window.location.origin,
// // // // //         audience: import.meta.env.VITE_AUTH0_AUDIENCE,
// // // // //       }}
// // // // //     >
// // // // //       <AuthProvider>
// // // // //         <Router>
// // // // //           <div className="min-h-screen bg-gray-50">
// // // // //             <Toaster position="top-right" />
            
// // // // //             <Routes>
// // // // //               <Route path="/login" element={<Login />} />
              
// // // // //               <Route
// // // // //                 path="/*"
// // // // //                 element={
// // // // //                   <ProtectedRoute>
// // // // //                     <Layout>
// // // // //                       <Routes>
// // // // //                         <Route path="/" element={<Navigate to="/dashboard" replace />} />
// // // // //                         <Route path="/dashboard" element={<Dashboard />} />
// // // // //                         <Route path="/patients" element={<PatientList />} />
// // // // //                         <Route path="/patients/:id" element={<PatientDetail />} />
// // // // //                         <Route path="/patients/:id/analyze" element={<AnalysisView />} />
// // // // //                         <Route path="/patients/:id/progress" element={<ProgressTracking />} />
// // // // //                         <Route path="/patients/:id/share" element={<ShareSummary />} />
// // // // //                         <Route path="/model-info" element={<ModelInfo />} />
// // // // //                         <Route path="/settings" element={<Settings />} />
// // // // //                       </Routes>
// // // // //                     </Layout>
// // // // //                   </ProtectedRoute>
// // // // //                 }
// // // // //               />
// // // // //             </Routes>
// // // // //           </div>
// // // // //         </Router>
// // // // //       </AuthProvider>
// // // // //     </Auth0Provider>
// // // // //   );
// // // // // }

// // // // // export default App;
// // // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // // import { Toaster } from 'react-hot-toast';
// // // // import { AuthProvider } from './context/AuthContext';
// // // // import ProtectedRoute from './components/auth/ProtectedRoute';
// // // // import Layout from './components/layout/Layout';

// // // // // Pages
// // // // import Login from './pages/Login';
// // // // import Dashboard from './pages/Dashboard';
// // // // import PatientList from './pages/PatientList';
// // // // import PatientDetail from './pages/PatientDetail';
// // // // import AnalysisView from './pages/AnalysisView';
// // // // import ProgressTracking from './pages/ProgressTracking';
// // // // import ShareSummary from './pages/ShareSummary';
// // // // import ModelInfo from './pages/ModelInfo';
// // // // import Settings from './pages/Settings';

// // // // function App() {
// // // //   return (
// // // //     <AuthProvider>
// // // //       <Router>
// // // //         <div className="min-h-screen bg-gray-50">
// // // //           <Toaster position="top-right" />
          
// // // //           <Routes>
// // // //             <Route path="/login" element={<Login />} />
            
// // // //             <Route
// // // //               path="/*"
// // // //               element={
// // // //                 <ProtectedRoute>
// // // //                   <Layout>
// // // //                     <Routes>
// // // //                       <Route path="/" element={<Navigate to="/dashboard" replace />} />
// // // //                       <Route path="/dashboard" element={<Dashboard />} />
// // // //                       <Route path="/patients" element={<PatientList />} />
// // // //                       <Route path="/patients/:id" element={<PatientDetail />} />
// // // //                       <Route path="/patients/:id/analyze" element={<AnalysisView />} />
// // // //                       <Route path="/patients/:id/progress" element={<ProgressTracking />} />
// // // //                       <Route path="/patients/:id/share" element={<ShareSummary />} />
// // // //                       <Route path="/model-info" element={<ModelInfo />} />
// // // //                       <Route path="/settings" element={<Settings />} />
// // // //                     </Routes>
// // // //                   </Layout>
// // // //                 </ProtectedRoute>
// // // //               }
// // // //             />
// // // //           </Routes>
// // // //         </div>
// // // //       </Router>
// // // //     </AuthProvider>
// // // //   );
// // // // }

// // // // export default App;
// // // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // // import { Toaster } from 'react-hot-toast';
// // // import { AuthProvider } from './context/AuthContext';
// // // import ProtectedRoute from './components/auth/ProtectedRoute';
// // // import Layout from './components/layout/Layout';

// // // // Pages
// // // import Login from './pages/Login';
// // // import Dashboard from './pages/Dashboard';
// // // import PatientList from './pages/PatientList';
// // // import PatientDetail from './pages/PatientDetail';
// // // import AnalysisView from './pages/AnalysisView';
// // // import ProgressTracking from './pages/ProgressTracking';
// // // import ShareSummary from './pages/ShareSummary';
// // // import ModelInfo from './pages/ModelInfo';
// // // import Settings from './pages/Settings';
// // // import DailyHuddle from './pages/DailyHuddle';
// // // import DetectionAI from './pages/DetectionAI';

// // // function App() {
// // //   return (
// // //     <AuthProvider>
// // //       <Router>
// // //         <div className="min-h-screen bg-gray-50">
// // //           <Toaster position="top-right" />
          
// // //           <Routes>
// // //             <Route path="/login" element={<Login />} />
            
// // //             <Route
// // //               path="/*"
// // //               element={
// // //                 <ProtectedRoute>
// // //                   <Layout>
// // //                     <Routes>
// // //                       <Route path="/" element={<Navigate to="/dashboard" replace />} />
// // //                       <Route path="/dashboard" element={<Dashboard />} />
// // //                       <Route path="/patients" element={<PatientList />} />
// // //                       <Route path="/patients/:id" element={<PatientDetail />} />
// // //                       <Route path="/patients/:id/analyze" element={<AnalysisView />} />
// // //                       <Route path="/patients/:id/progress" element={<ProgressTracking />} />
// // //                       <Route path="/patients/:id/share" element={<ShareSummary />} />
// // //                       <Route path="/huddle" element={<DailyHuddle />} />
// // //                       <Route path="/detection" element={<DetectionAI />} />
// // //                       <Route path="/model-info" element={<ModelInfo />} />
// // //                       <Route path="/settings" element={<Settings />} />
// // //                     </Routes>
// // //                   </Layout>
// // //                 </ProtectedRoute>
// // //               }
// // //             />
// // //           </Routes>
// // //         </div>
// // //       </Router>
// // //     </AuthProvider>
// // //   );
// // // }

// // // export default App;
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { Toaster } from 'react-hot-toast';
// // import { AuthProvider } from './context/AuthContext';
// // import ProtectedRoute from './components/auth/ProtectedRoute';
// // import Layout from './components/layout/Layout';

// // // Pages
// // import Login from './pages/Login';
// // import Dashboard from './pages/Dashboard';
// // import PatientList from './pages/PatientList';
// // import PatientDetail from './pages/PatientDetail';
// // import AnalysisView from './pages/AnalysisView';
// // import ProgressTracking from './pages/ProgressTracking';
// // import ShareSummary from './pages/ShareSummary';
// // import ModelInfo from './pages/ModelInfo';
// // import Settings from './pages/Settings';
// // import DailyHuddle from './pages/DailyHuddle';
// // import DetectionAI from './pages/DetectionAI';

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <div className="min-h-screen bg-gray-50">
// //           <Toaster position="top-right" />
          
// //           <Routes>
// //             <Route path="/login" element={<Login />} />
            
// //             <Route
// //               path="/*"
// //               element={
// //                 <ProtectedRoute>
// //                   <Layout>
// //                     <Routes>
// //                       <Route path="/" element={<Navigate to="/dashboard" replace />} />
// //                       <Route path="/dashboard" element={<Dashboard />} />
// //                       <Route path="/patients" element={<PatientList />} />
// //                       <Route path="/patients/:id" element={<PatientDetail />} />
// //                       <Route path="/patients/:id/analyze" element={<AnalysisView />} />
// //                       <Route path="/patients/:id/progress" element={<ProgressTracking />} />
// //                       <Route path="/patients/:id/share" element={<ShareSummary />} />
// //                       <Route path="/huddle" element={<DailyHuddle />} />
// //                       <Route path="/detection" element={<DetectionAI />} />
// //                       <Route path="/model-info" element={<ModelInfo />} />
// //                       <Route path="/settings" element={<Settings />} />
// //                     </Routes>
// //                   </Layout>
// //                 </ProtectedRoute>
// //               }
// //             />
// //           </Routes>
// //         </div>
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
// import { Toaster } from 'react-hot-toast'
// import { AuthProvider, useAuth } from './context/AuthContext'
// import { useEffect } from 'react'

// // Import all pages
// import Login from './pages/Login'
// import Dashboard from './pages/Dashboard'
// import PatientList from './pages/PatientList'
// import PatientDetail from './pages/PatientDetail'
// import AnalysisView from './pages/AnalysisView'
// import ProgressTracking from './pages/ProgressTracking'
// import ShareSummary from './pages/ShareSummary'
// import ModelInfo from './pages/ModelInfo'
// import Settings from './pages/Settings'
// import DailyHuddle from './pages/DailyHuddle'
// import DetectionAI from './pages/DetectionAI'

// // Layout components
// import Layout from './components/layout/Layout'
// import LoadingSpinner from './components/common/LoadingSpinner'

// // Protected Route Component
// function ProtectedRoute({ children }) {
//   const { isAuthenticated, isLoading } = useAuth()
//   const location = useLocation()

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner size="large" text="Loading..." />
//       </div>
//     )
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />
//   }

//   return children
// }

// // Main App Component
// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <AppContent />
//       </AuthProvider>
//     </BrowserRouter>
//   )
// }

// // Separate component to use useAuth inside BrowserRouter
// function AppContent() {
//   const { isAuthenticated } = useAuth()
//   const location = useLocation()

//   // Scroll to top on route change
//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [location.pathname])

//   return (
//     <>
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//           style: {
//             background: '#363636',
//             color: '#fff',
//           },
//           success: {
//             iconTheme: {
//               primary: '#10b981',
//               secondary: '#fff',
//             },
//           },
//           error: {
//             iconTheme: {
//               primary: '#ef4444',
//               secondary: '#fff',
//             },
//           },
//         }}
//       />
      
//       <Routes>
//         {/* Public Route */}
//         <Route 
//           path="/login" 
//           element={
//             isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
//           } 
//         />

//         {/* Protected Routes */}
//         <Route
//           path="/*"
//           element={
//             <ProtectedRoute>
//               <Layout>
//                 <Routes>
//                   <Route index element={<Navigate to="/dashboard" replace />} />
//                   <Route path="dashboard" element={<Dashboard />} />
//                   <Route path="patients" element={<PatientList />} />
//                   <Route path="patients/:id" element={<PatientDetail />} />
//                   <Route path="patients/:id/analyze" element={<AnalysisView />} />
//                   <Route path="patients/:id/progress" element={<ProgressTracking />} />
//                   <Route path="patients/:id/share" element={<ShareSummary />} />
//                   <Route path="huddle" element={<DailyHuddle />} />
//                   <Route path="detection" element={<DetectionAI />} />
//                   <Route path="model-info" element={<ModelInfo />} />
//                   <Route path="settings" element={<Settings />} />
                  
//                   {/* Catch all - 404 */}
//                   <Route path="*" element={<NotFound />} />
//                 </Routes>
//               </Layout>
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </>
//   )
// }

// // 404 Not Found Component
// function NotFound() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center">
//         <h1 className="text-6xl font-bold text-gray-900">404</h1>
//         <p className="text-xl text-gray-600 mt-4">Page not found</p>
//         <a 
//           href="/dashboard" 
//           className="inline-block mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
//         >
//           Go to Dashboard
//         </a>
//       </div>
//     </div>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useEffect, Suspense, lazy } from 'react'

// Components
import Layout from './components/layout/Layout'
import LoadingSpinner from './components/common/LoadingSpinner'

// Eager load critical pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

// Lazy load other pages
const PatientList = lazy(() => import('./pages/PatientList'))
const PatientDetail = lazy(() => import('./pages/PatientDetail'))
const AnalysisView = lazy(() => import('./pages/AnalysisView'))
const ProgressTracking = lazy(() => import('./pages/ProgressTracking'))
const ShareSummary = lazy(() => import('./pages/ShareSummary'))
const ModelInfo = lazy(() => import('./pages/ModelInfo'))
const Settings = lazy(() => import('./pages/Settings'))
const DailyHuddle = lazy(() => import('./pages/DailyHuddle'))
const DetectionAI = lazy(() => import('./pages/DetectionAI'))

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="large" text="Loading page..." />
  </div>
)

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  console.log('ProtectedRoute - Auth:', isAuthenticated, 'Loading:', isLoading)

  if (isLoading) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

// Main App Component
function App() {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

// App Content with Router
function AppContent() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  useEffect(() => {
    console.log('Route changed:', location.pathname, 'Auth:', isAuthenticated)
  }, [location.pathname, isAuthenticated])

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Login Route */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login />
              )
            } 
          />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/patients" element={<PatientList />} />
                    <Route path="/patients/:id" element={<PatientDetail />} />
                    <Route path="/patients/:id/analyze" element={<AnalysisView />} />
                    <Route path="/patients/:id/progress" element={<ProgressTracking />} />
                    <Route path="/patients/:id/share" element={<ShareSummary />} />
                    <Route path="/huddle" element={<DailyHuddle />} />
                    <Route path="/detection" element={<DetectionAI />} />
                    <Route path="/model-info" element={<ModelInfo />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
