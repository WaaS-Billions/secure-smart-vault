
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
  fullName?: string;
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
  const { address, isConnected, connectWallet: connectWeb3Wallet } = useWallet();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Setup axios interceptor for auth
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, []);

  // Check for existing authentication
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        // Check for token in localStorage
        const token = localStorage.getItem('authToken');
        
        if (token) {
          try {
            // Verify token with backend
            const response = await axios.get('http://localhost:3000/auth/profile');
            
            setUser({
              id: response.data.userId,
              email: response.data.email,
              fullName: response.data.fullName,
              isWalletUser: false
            });
          } catch (error) {
            console.error('Auth token validation failed:', error);
            localStorage.removeItem('authToken');
            setUser(null);
          }
        } else if (isConnected && address) {
          // User is connected with wallet
          setUser({
            id: address,
            address,
            isWalletUser: true
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [isConnected, address]);

  // Login with email/password
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password
      });
      
      const { access_token, user: userData } = response.data;
      
      localStorage.setItem('authToken', access_token);
      
      setUser({
        id: userData.id,
        email: userData.email,
        fullName: userData.fullName,
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
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    try {
      await connectWeb3Wallet?.();
      
      // After wallet is connected, the useEffect will pick up the new wallet address
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
    } catch (error) {
      console.error('Wallet connection failed:', error);
      toast({
        variant: "destructive",
        title: "Connection failed",
        description: "Could not connect to wallet",
      });
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
    navigate('/login');
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
