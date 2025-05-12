
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  Menu
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Wallets', path: '/wallet/create', icon: Wallet },
    { name: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
    { name: 'Buy/Sell', path: '/onramp', icon: TrendingUp },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

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
  };

  return (
    <div className="min-h-screen bg-navy">
      <SidebarProvider defaultOpen={true}>
        {/* Main sidebar */}
        <Sidebar variant="inset" className="border-gold/30">
          <SidebarHeader>
            <div className="flex items-center space-x-2 px-4 py-2">
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
            <div className="p-4 border-t border-gold/30">
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
                className="w-full border-gold/30 text-gold hover:bg-gold/10"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        {/* Main content */}
        <SidebarInset>
          {/* Mobile header with menu and user info */}
          <header className="flex items-center justify-between p-4 border-b border-gold/20 lg:hidden">
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
            
            <Avatar className="h-8 w-8 border border-gold/30">
              <AvatarFallback className="bg-gold/20 text-gold">{getUserInitials()}</AvatarFallback>
            </Avatar>
          </header>
          
          {/* Dashboard header with sidebar trigger for desktop */}
          <header className="hidden lg:flex items-center justify-between p-4 border-b border-gold/20">
            <div className="flex items-center">
              <SidebarTrigger className="text-gold hover:bg-gold/10 mr-4" />
              <h1 className="text-xl font-bold text-gold">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Right side header content */}
            </div>
          </header>
          
          {/* Main content */}
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
