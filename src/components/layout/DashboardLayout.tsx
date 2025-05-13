
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarInset
} from '@/components/ui/sidebar';
import {
  Home,
  Wallet,
  ArrowLeftRight,
  Settings,
  TrendingUp,
  LogOut,
  Menu,
  Bell,
  Search,
  User
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Navigation items
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Wallets', path: '/wallet/create', icon: Wallet },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { name: 'Buy/Sell', path: '/onramp', icon: TrendingUp },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  // Check if path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getUserInitials = () => {
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    if (user?.address) {
      return user.address.substring(2, 4).toUpperCase();
    }
    return 'DW';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  // Effect to check authentication
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-navy">
      <SidebarProvider defaultOpen={true}>
        {/* Main sidebar */}
        <Sidebar className="border-gold/20 glass-card">
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-4">
              <div className="flex-1">
                <h1 className="text-gold text-xl font-bold">Daily Wallet</h1>
                <p className="text-white/70 text-xs">Secure Crypto Management</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={item.name}
                  >
                    <Link to={item.path} className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4 border-t border-gold/20">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-9 w-9 border border-gold/30">
                  <AvatarFallback className="bg-gold/20 text-gold">{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gold font-medium truncate max-w-[160px]">
                    {user?.email || (user?.address ? `${user.address.substring(0, 6)}...${user.address.substring(38)}` : 'User')}
                  </p>
                  <p className="text-xs text-white/60">
                    {user?.isWalletUser ? 'Wallet User' : 'Email User'}
                  </p>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout} 
                className="w-full border-gold/20 text-gold hover:bg-gold/10"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        {/* Main content */}
        <SidebarInset>
          {/* Mobile header with menu and user info */}
          <header className="flex items-center justify-between p-4 border-b border-gold/20 glass-form lg:hidden">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu} 
                className="lg:hidden text-gold"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-gold text-lg font-bold">Daily Wallet</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-gold relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gold text-navy">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Avatar className="h-8 w-8 border border-gold/20">
                <AvatarFallback className="bg-gold/20 text-gold">{getUserInitials()}</AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          {/* Dashboard header with sidebar trigger for desktop */}
          <header className="hidden lg:flex items-center justify-between p-4 border-b border-gold/20 glass-form">
            <div className="flex items-center">
              <SidebarTrigger className="text-gold hover:bg-gold/10 mr-4" />
              <h1 className="text-xl font-bold text-gold">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 rounded-full bg-white/10 border border-gold/20 text-white/90 focus:outline-none focus:border-gold/40 w-60"
                />
              </div>
              
              <Button variant="ghost" size="icon" className="text-gold relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gold text-navy">
                    {notifications}
                  </Badge>
                )}
              </Button>
              
              <div className="flex items-center gap-2 border-l pl-4 border-gold/20">
                <Avatar className="h-8 w-8 border border-gold/30">
                  {user?.profileImage ? (
                    <AvatarImage src={user.profileImage} alt="User" />
                  ) : (
                    <AvatarFallback className="bg-gold/20 text-gold">{getUserInitials()}</AvatarFallback>
                  )}
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium text-gold">
                    {user?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-white/60">
                    {user?.role || 'User'}
                  </p>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <main className="p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
