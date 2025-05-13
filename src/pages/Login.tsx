
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { Wallet, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, connectWallet, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      // Navigate to the page they tried to visit or dashboard
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      // Navigate to the page they tried to visit or dashboard
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: "Wallet connection failed",
        description: "Could not connect to your wallet.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card">
        <CardHeader>
          <CardTitle className="text-gold text-center text-2xl">Sign In</CardTitle>
          <CardDescription className="text-center text-white/80">
            Access your Daily Wallet Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gold">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-navy/60 border-gold/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gold">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-navy/60 border-gold/20 text-white"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full btn-gold" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </div>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-gold/20" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-navy px-2 text-gold">OR</span>
              </div>
            </div>
            
            <Button 
              onClick={handleConnectWallet}
              variant="outline" 
              className="w-full mt-4 border-gold/20 text-gold hover:bg-gold/10"
              disabled={isLoading}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-white/70 text-center">
            Don't have an account?{" "}
            <Link to="/get-started" className="text-gold hover:underline">
              Get Started
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
