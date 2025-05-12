
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';
import { Wallet, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, connectWallet, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md paper-card">
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
                  className="bg-navy border-gold/30 text-white"
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
                  className="bg-navy border-gold/30 text-white"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full btn-gold" 
                disabled={isLoading}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-gold/30" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-navy px-2 text-gold">OR</span>
              </div>
            </div>
            
            <Button 
              onClick={connectWallet} 
              variant="outline" 
              className="w-full mt-4 border-gold text-gold hover:bg-gold/10"
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
