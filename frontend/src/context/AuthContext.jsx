// // // import { createContext, useContext, useState, useEffect } from 'react';
// // // import { useAuth0 } from '@auth0/auth0-react';

// // // const AuthContext = createContext();

// // // export const AuthProvider = ({ children }) => {
// // //   const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();
// // //   const [clinician, setClinician] = useState(null);

// // //   useEffect(() => {
// // //     if (isAuthenticated && user) {
// // //       setClinician({
// // //         id: user.sub,
// // //         name: user.name,
// // //         email: user.email,
// // //         picture: user.picture,
// // //       });
// // //     }
// // //   }, [isAuthenticated, user]);

// // //   const value = {
// // //     isAuthenticated,
// // //     isLoading,
// // //     clinician,
// // //     login: loginWithRedirect,
// // //     logout: () => logout({ returnTo: window.location.origin }),
// // //   };

// // //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // // };

// // // export const useAuth = () => {
// // //   const context = useContext(AuthContext);
// // //   if (!context) {
// // //     throw new Error('useAuth must be used within AuthProvider');
// // //   }
// // //   return context;
// // // };
// // import { createContext, useContext, useState, useEffect } from 'react';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [clinician, setClinician] = useState(null);

// //   useEffect(() => {
// //     // Check if user is already logged in
// //     const storedUser = localStorage.getItem('clinician');
// //     if (storedUser) {
// //       setClinician(JSON.parse(storedUser));
// //       setIsAuthenticated(true);
// //     }
// //     setIsLoading(false);
// //   }, []);

// //   const login = (userData) => {
// //     const user = userData || {
// //       id: '1',
// //       name: 'Dr. Sarah Johnson',
// //       email: 'sarah.johnson@hospital.com',
// //       specialty: 'Dermatology',
// //       picture: null,
// //     };
    
// //     setClinician(user);
// //     setIsAuthenticated(true);
// //     localStorage.setItem('clinician', JSON.stringify(user));
// //   };

// //   const logout = () => {
// //     setClinician(null);
// //     setIsAuthenticated(false);
// //     localStorage.removeItem('clinician');
// //   };

// //   const value = {
// //     isAuthenticated,
// //     isLoading,
// //     clinician,
// //     login,
// //     logout,
// //   };

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within AuthProvider');
// //   }
// //   return context;
// // };
// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [clinician, setClinician] = useState(null);

//   useEffect(() => {
//     // Check if user is already logged in
//     const storedUser = localStorage.getItem('clinician');
//     if (storedUser) {
//       try {
//         setClinician(JSON.parse(storedUser));
//         setIsAuthenticated(true);
//       } catch (error) {
//         console.error('Error parsing stored user:', error);
//         localStorage.removeItem('clinician');
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (userData) => {
//     const user = userData || {
//       id: '1',
//       name: 'Dr. Sarah Johnson',
//       email: 'sarah.johnson@hospital.com',
//       specialty: 'Dermatology',
//       picture: null,
//     };
    
//     setClinician(user);
//     setIsAuthenticated(true);
//     localStorage.setItem('clinician', JSON.stringify(user));
//   };

//   const logout = () => {
//     setClinician(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem('clinician');
//   };

//   const value = {
//     isAuthenticated,
//     isLoading,
//     clinician,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [clinician, setClinician] = useState(null)

  useEffect(() => {
    console.log('AuthProvider initializing...')
    
    // Check localStorage with error handling for WebView
    try {
      const storedUser = localStorage.getItem('clinician')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        console.log('Found stored user:', user)
        setClinician(user)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Error reading localStorage:', error)
      localStorage.removeItem('clinician')
    }
    
    setIsLoading(false)
    console.log('AuthProvider initialized')
  }, [])

  const login = (userData) => {
    const user = userData || {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      specialty: 'Dermatology',
      role: 'clinician'
    }
    
    console.log('Logging in user:', user)
    setClinician(user)
    setIsAuthenticated(true)
    
    try {
      localStorage.setItem('clinician', JSON.stringify(user))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  const logout = () => {
    console.log('Logging out')
    setClinician(null)
    setIsAuthenticated(false)
    
    try {
      localStorage.removeItem('clinician')
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  }

  const value = {
    isAuthenticated,
    isLoading,
    clinician,
    login,
    logout,
  }

  console.log('AuthContext value:', { isAuthenticated, isLoading, hasClinic: !!clinician })

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
