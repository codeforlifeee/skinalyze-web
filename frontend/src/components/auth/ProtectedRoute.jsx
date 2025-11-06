// import { useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../common/LoadingSpinner';

// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated, isLoading } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       navigate('/login');
//     }
//   }, [isAuthenticated, isLoading, navigate]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   return isAuthenticated ? children : null;
// }
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoadingSpinner from '../common/LoadingSpinner'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading..." />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
