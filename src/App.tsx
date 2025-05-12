
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from 'wagmi';
import { config as wagmiConfig } from "@/lib/web3/wagmi-config";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateWallet from "./pages/CreateWallet";
import WalletDetails from "./pages/WalletDetails";
import OnRamp from "./pages/OnRamp";
import OffRamp from "./pages/OffRamp";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";
import { useEffect } from "react";

// Create a React Query client
const queryClient = new QueryClient();

const App = () => {
  // Set document title
  useEffect(() => {
    document.title = "Daily Wallet - Non-custodial Smart Wallet";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected routes */}
                <Route path="/dashboard" element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                } />
                <Route path="/wallet/create" element={
                  <RequireAuth>
                    <CreateWallet />
                  </RequireAuth>
                } />
                <Route path="/wallet/:address" element={
                  <RequireAuth>
                    <WalletDetails />
                  </RequireAuth>
                } />
                <Route path="/onramp" element={
                  <RequireAuth>
                    <OnRamp />
                  </RequireAuth>
                } />
                <Route path="/offramp" element={
                  <RequireAuth>
                    <OffRamp />
                  </RequireAuth>
                } />
                
                {/* Admin routes */}
                <Route path="/admin" element={
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                } />
                
                {/* 404 catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default App;
