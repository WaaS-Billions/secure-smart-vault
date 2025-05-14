
import { createContext, useContext, useEffect } from 'react';
import { AuthContextType, AuthProviderProps } from './types';
import { setupAuthInterceptor } from './utils';
import { useAuthProvider } from '@/hooks/useAuthProvider';

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Create provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthProvider();
  
  // Setup axios interceptor for auth
  useEffect(() => {
    const cleanup = setupAuthInterceptor();
    return cleanup;
  }, []);

  return (
    <AuthContext.Provider
      value={auth}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create hook for using context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
