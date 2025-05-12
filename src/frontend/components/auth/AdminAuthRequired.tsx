
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

interface AdminAuthRequiredProps {
  children: React.ReactNode;
}

const AdminAuthRequired: React.FC<AdminAuthRequiredProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      
      try {
        // Configure axios to send the token with the request
        const response = await axios.get('/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          throw new Error('Failed to verify authentication');
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        
        toast({
          title: 'Authentication Failed',
          description: 'Please sign in again',
          variant: 'destructive',
        });
      }
    };
    
    verifyAuth();
  }, [toast]);
  
  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  // Render children if authenticated
  return <>{children}</>;
};

export default AdminAuthRequired;
