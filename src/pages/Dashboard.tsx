
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet } from "lucide-react";
import { useWallet } from '@/lib/web3/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';

interface SmartWallet {
  address: string;
  name: string;
  balance: string;
  signers: number;
  threshold: number;
  type: 'personal' | 'multiparty';
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { isConnected, address, balance, symbol } = useWallet();
  const { toast } = useToast();
  const { user } = useAuth();
  const [wallets, setWallets] = useState<SmartWallet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // In a real app, this would fetch wallets from your API
  useEffect(() => {
    // Simulate API call
    if (user) {
      setIsLoading(true);
      
      // Mock data for now
      // In a real app, this would be: axios.get('/api/wallet')
      setTimeout(() => {
        setWallets([
          {
            address: '0x1234567890abcdef1234567890abcdef12345678',
            name: 'Personal Wallet',
            balance: '1.25',
            signers: 1,
            threshold: 1,
            type: 'personal'
          },
          {
            address: '0xabcdef1234567890abcdef1234567890abcdef12',
            name: 'Team Treasury',
            balance: '5.72',
            signers: 5,
            threshold: 3,
            type: 'multiparty'
          }
        ]);
        setIsLoading(false);
      }, 500);
    }
  }, [user]);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <Card className="paper-card">
            <CardHeader>
              <CardTitle className="text-gold">Total Balance</CardTitle>
              <CardDescription className="text-white/70">Across all wallets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gold">6.97 ETH</div>
              <p className="text-white/70 text-sm mt-1">≈ $16,235.45 USD</p>
            </CardContent>
          </Card>
          
          <Card className="paper-card">
            <CardHeader>
              <CardTitle className="text-gold">Active Wallets</CardTitle>
              <CardDescription className="text-white/70">Total wallets created</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gold">{wallets.length}</div>
              <p className="text-white/70 text-sm mt-1">
                {wallets.filter(w => w.type === 'personal').length} Personal,&nbsp;
                {wallets.filter(w => w.type === 'multiparty').length} Multi-party
              </p>
            </CardContent>
          </Card>
          
          <Card className="paper-card">
            <CardHeader>
              <CardTitle className="text-gold">Connected Account</CardTitle>
              <CardDescription className="text-white/70">Current wallet connection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-mono text-white/90 truncate">
                {address || 'Not connected via Web3'}
              </div>
              {isConnected ? (
                <p className="text-white/70 text-sm mt-1">
                  {balance} {symbol}
                </p>
              ) : (
                <p className="text-white/70 text-sm mt-1">
                  Using email authentication
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gold">Your Smart Wallets</h2>
            <Button onClick={() => navigate('/wallet/create')} className="btn-gold">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Wallet
            </Button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8 text-white/70">Loading wallets...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wallets.map((wallet) => (
                <Card 
                  key={wallet.address}
                  className="paper-card cursor-pointer hover:border-gold/40 transition-colors"
                  onClick={() => navigate(`/wallet/${wallet.address}`)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center text-gold">
                        <Wallet className="mr-2 h-5 w-5" />
                        {wallet.name}
                      </CardTitle>
                      <span className={`text-xs px-2 py-1 rounded ${
                        wallet.type === 'personal' 
                          ? 'bg-blue-900/30 text-blue-400' 
                          : 'bg-purple-900/30 text-purple-400'
                      }`}>
                        {wallet.type === 'personal' ? 'Personal' : 'Multi-Party'}
                      </span>
                    </div>
                    <CardDescription className="font-mono text-xs text-white/70">
                      {wallet.address.substring(0, 6)}...{wallet.address.substring(38)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Balance:</span>
                        <span className="font-medium text-white">{wallet.balance} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Signers:</span>
                        <span className="text-white">
                          {wallet.signers} {wallet.type === 'multiparty' && `(${wallet.threshold} required)`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card 
                className="flex flex-col items-center justify-center h-full border-dashed border-gold/20 paper-card cursor-pointer hover:border-gold/40 transition-colors"
                onClick={() => navigate('/wallet/create')}
              >
                <div className="py-8 flex flex-col items-center text-center px-4">
                  <PlusCircle className="h-8 w-8 mb-2 text-gold" />
                  <p className="font-medium text-gold">Create New Wallet</p>
                  <p className="text-sm text-white/70 mt-1">
                    Add another smart wallet to your account
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
