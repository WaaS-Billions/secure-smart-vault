
// Re-export everything from the new structure
import { AuthProvider, useAuth } from './auth/AuthProvider';
import { User, AuthContextType, AuthProviderProps } from './auth/types';

export { AuthProvider, useAuth };
export type { User, AuthContextType, AuthProviderProps };
