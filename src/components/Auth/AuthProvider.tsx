import React from 'react';
import { AuthContext, useAuthProvider } from '../../hooks/useAuth';

/**
 * AuthProvider component props interface
 */
interface AuthProviderProps {
  /** Child components to wrap with authentication context */
  children: React.ReactNode;
}

/**
 * AuthProvider component - provides authentication context to the application
 * Wraps the app with authentication state and methods
 */
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;