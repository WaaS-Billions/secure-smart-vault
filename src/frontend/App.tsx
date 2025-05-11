
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
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/wallet/create" element={<CreateWallet />} />
              <Route path="/wallet/:address" element={<WalletDetails />} />
              <Route path="/onramp" element={<OnRamp />} />
              <Route path="/offramp" element={<OffRamp />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default App;
