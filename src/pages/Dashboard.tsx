import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet, TrendingUp, ChevronRight, Activity, Clock, ArrowRight } from "lucide-react";
import { useWallet } from '@/lib/web3/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';

interface SmartWallet {
  address: string;
  name: string;
  balance: string;
  signers: number;
  threshold: number;
  type: 'personal' | 'multiparty';
}

interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing' | 'swap';
  amount: string;
  asset: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  address: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { isConnected, address, balance, symbol } = useWallet();
  const { toast } = useToast();
  const { user } = useAuth();
  const [wallets, setWallets] = useState<SmartWallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check authentication status and fetch data
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Simulate API call to fetch wallet and transaction data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to fetch user wallets
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
          
          // Mock transaction data
          setTransactions([
            {
              id: 'tx1',
              type: 'incoming',
              amount: '0.42',
              asset: 'ETH',
              timestamp: '2023-05-15T14:20:00Z',
              status: 'completed',
              address: '0x71c7656ec7ab88b098defb751b7401b5f6d8976f'
            },
            {
              id: 'tx2',
              type: 'outgoing',
              amount: '0.15',
              asset: 'ETH',
              timestamp: '2023-05-10T10:30:00Z',
              status: 'completed',
              address: '0x7a16ff8270133f063aab6c9977183d9e72835428'
            },
            {
              id: 'tx3',
              type: 'swap',
              amount: '1.00',
              asset: 'ETH → USDC',
              timestamp: '2023-05-09T08:45:00Z',
              status: 'pending',
              address: '-'
            }
          ]);
          
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch wallet data:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load wallet data'
        });
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, navigate, toast]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    });
  };
  
  const getTotalBalance = () => {
    return wallets.reduce((acc, wallet) => acc + parseFloat(wallet.balance), 0).toFixed(2);
  };
  
  if (!user) {
    return null; // Don't render anything if not authenticated
  }
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <Card className="paper-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-gold flex items-center text-lg">
                <Wallet className="mr-2 h-5 w-5" /> Total Balance
              </CardTitle>
              <CardDescription className="text-white/70">Across all wallets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gold">{getTotalBalance()} ETH</div>
              <p className="text-white/70 text-sm mt-1">≈ $16,235.45 USD</p>
            </CardContent>
          </Card>
          
          <Card className="paper-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-gold flex items-center text-lg">
                <Activity className="mr-2 h-5 w-5" /> Active Wallets
              </CardTitle>
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
            <CardHeader className="pb-2">
              <CardTitle className="text-gold flex items-center text-lg">
                <TrendingUp className="mr-2 h-5 w-5" /> Market Trend
              </CardTitle>
              <CardDescription className="text-white/70">Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">+3.8%</div>
              <p className="text-white/70 text-sm mt-1">
                ETH: $2,346.78 (↑2.4%)
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wallets.map((wallet) => (
                    <Card 
                      key={wallet.address}
                      className="paper-card cursor-pointer hover:border-gold/40 transition-colors"
                      onClick={() => navigate(`/wallet/${wallet.address}`)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center text-gold text-lg">
                            <Wallet className="mr-2 h-5 w-5" />
                            {wallet.name}
                          </CardTitle>
                          <Badge className={`${
                            wallet.type === 'personal' 
                              ? 'bg-blue-900/30 text-blue-400 border-blue-400/20' 
                              : 'bg-purple-900/30 text-purple-400 border-purple-400/20'
                          }`}>
                            {wallet.type === 'personal' ? 'Personal' : 'Multi-Party'}
                          </Badge>
                        </div>
                        <CardDescription className="font-mono text-xs text-white/70">
                          {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
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
          
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gold">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Button onClick={() => navigate('/onramp')} variant="outline" className="border-gold/20 text-gold hover:bg-gold/10 h-auto py-4 flex flex-col items-center">
                  <TrendingUp className="h-6 w-6 mb-2" />
                  <span className="font-medium">Buy Crypto</span>
                  <span className="text-xs text-white/70 mt-1">Deposit funds easily</span>
                </Button>
                
                <Button onClick={() => navigate('/offramp')} variant="outline" className="border-gold/20 text-gold hover:bg-gold/10 h-auto py-4 flex flex-col items-center">
                  <TrendingUp className="h-6 w-6 mb-2 rotate-180" />
                  <span className="font-medium">Sell Crypto</span>
                  <span className="text-xs text-white/70 mt-1">Cash out to bank</span>
                </Button>
                
                <Button onClick={() => navigate('/wallet/create')} variant="outline" className="border-gold/20 text-gold hover:bg-gold/10 h-auto py-4 flex flex-col items-center">
                  <PlusCircle className="h-6 w-6 mb-2" />
                  <span className="font-medium">New Wallet</span>
                  <span className="text-xs text-white/70 mt-1">Create multisig</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gold">Recent Activity</h2>
              <Button variant="link" className="text-gold p-0 h-auto flex items-center gap-1" onClick={() => navigate('/transactions')}>
                View all <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Card className="paper-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-gold text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2" /> Transaction History
                </CardTitle>
                <CardDescription className="text-white/70">
                  Recent transfers and swaps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between p-2 border-b border-gold/10">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tx.type === 'incoming' 
                            ? 'bg-green-900/20 text-green-400'
                            : tx.type === 'outgoing' 
                              ? 'bg-amber-900/20 text-amber-400' 
                              : 'bg-purple-900/20 text-purple-400'
                        }`}>
                          {tx.type === 'incoming' ? (
                            <ArrowRight className="h-4 w-4 transform -rotate-45" />
                          ) : tx.type === 'outgoing' ? (
                            <ArrowRight className="h-4 w-4 transform rotate-45" />
                          ) : (
                            <ArrowRight className="h-4 w-4 transform rotate-90" />
                          )}
                        </div>
                        
                        <div>
                          <p className="font-medium text-white">{tx.type === 'incoming' ? 'Received' : tx.type === 'outgoing' ? 'Sent' : 'Swapped'}</p>
                          <p className="text-xs text-white/70">
                            {formatDate(tx.timestamp)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-medium ${
                          tx.type === 'incoming' 
                            ? 'text-green-400' 
                            : tx.type === 'outgoing' 
                              ? 'text-amber-400' 
                              : 'text-purple-400'
                        }`}>
                          {tx.type === 'incoming' ? '+' : tx.type === 'outgoing' ? '-' : ''}{tx.amount} {tx.asset}
                        </p>
                        <p className="text-xs text-white/70 font-mono">
                          {tx.address === '-' ? 'Swap' : `${tx.address.substring(0, 6)}...${tx.address.substring(tx.address.length - 4)}`}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {transactions.length === 0 && (
                    <div className="text-center py-4 text-white/70">
                      No recent transactions
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
