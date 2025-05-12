
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useWallet } from '@/lib/web3/hooks/useWallet';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

// Define auth context types
type User = {
  id: string;
  email?: string;
  address?: string;
  isWalletUser: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  connectWallet: () => Promise<void>;
  logout: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider props
type AuthProviderProps = {
  children: ReactNode;
};

// Create provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { address, isConnected } = useWallet();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing authentication
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      // Check for token in localStorage
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          // Verify token with backend
          const response = await axios.get('/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setUser({
            id: response.data.userId,
            email: response.data.email,
            isWalletUser: false
          });
        } catch (error) {
          console.error('Auth token validation failed:', error);
          localStorage.removeItem('authToken');
        }
      } else if (isConnected && address) {
        // User is connected with wallet
        setUser({
          id: address,
          address,
          isWalletUser: true
        });
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [isConnected, address]);

  // Login with email/password
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      
      localStorage.setItem('authToken', response.data.access_token);
      
      setUser({
        id: response.data.user.id,
        email: response.data.user.email,
        isWalletUser: false
      });
      
      toast({
        title: "Login successful",
        description: "Welcome to Daily Wallet dashboard",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Connect wallet (placeholder - actual implementation happens in wallet hook)
  const connectWallet = async () => {
    // The actual connection is handled by the web3modal/wallet hooks
    if (isConnected && address) {
      setUser({
        id: address,
        address,
        isWalletUser: true
      });
      
      toast({
        title: "Wallet connected",
        description: "Welcome to Daily Wallet dashboard",
      });
      
      navigate('/dashboard');
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        connectWallet,
        logout
      }}
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
