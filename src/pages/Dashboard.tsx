
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowRight, LogOut } from 'lucide-react';
import { useWallet } from '@/lib/web3/hooks/useWallet';

const Dashboard = () => {
  const { address, balance, symbol, networkName, disconnectWallet } = useWallet();
  
  // Mock wallet data - in a real app, this would come from your smart contract
  const smartWallets = [
    { 
      name: 'My Smart Wallet', 
      address: '0x1234...5678', 
      balance: '1.24 ETH',
      type: 'Personal'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gold">Wallet Dashboard</h1>
            <p className="text-white/70 mt-2">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
            <p className="text-white/70">Network: {networkName}</p>
          </div>
          <div className="flex gap-4">
            <Button asChild className="bg-gold text-navy hover:bg-gold/90">
              <Link to="/wallet/create">
                <Plus className="mr-2 h-4 w-4" /> Create Smart Wallet
              </Link>
            </Button>
            <Button 
              onClick={disconnectWallet}
              variant="outline" 
              className="border-gold text-gold hover:bg-gold/10"
            >
              <LogOut className="mr-2 h-4 w-4" /> Disconnect
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border border-gold/20">
            <CardHeader>
              <CardTitle className="text-gold">Connected Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Address:</span>
                  <span className="font-mono text-white">{address?.slice(0, 10)}...{address?.slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Balance:</span>
                  <span className="text-white">{balance?.slice(0, 8)} {symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Network:</span>
                  <span className="text-white">{networkName}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {smartWallets.map((wallet, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold">{wallet.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/70">Address:</span>
                    <span className="font-mono text-white">{wallet.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Balance:</span>
                    <span className="text-white">{wallet.balance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Type:</span>
                    <span className="text-white">{wallet.type}</span>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4 border-gold text-gold hover:bg-gold/10">
                    <Link to={`/wallet/${wallet.address.replace('0x', '')}`}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {smartWallets.length === 0 && (
            <div className="col-span-2 text-center py-12 bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg">
              <p className="text-white/70 mb-4">You don't have any smart wallets yet.</p>
              <Button asChild className="bg-gold text-navy hover:bg-gold/90">
                <Link to="/wallet/create">
                  <Plus className="mr-2 h-4 w-4" /> Create Your First Smart Wallet
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
