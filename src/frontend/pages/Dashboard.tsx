
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowRight } from 'lucide-react';
import GoBackButton from '@/components/common/GoBackButton';

const Dashboard = () => {
  // This is a placeholder for actual wallet data
  const wallets = [
    { name: 'Personal Wallet', address: '0x1234...5678', balance: '1.24 ETH' },
    { name: 'Business Account', address: '0x8765...4321', balance: '0.56 ETH' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-6">
        <GoBackButton />
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gold">Wallet Dashboard</h1>
        <Button asChild className="gold-gradient text-navy hover:opacity-90">
          <Link to="/wallet/create">
            <Plus className="mr-2 h-4 w-4" /> Create Wallet
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wallets.map((wallet, index) => (
          <Card key={index} className="glass-form">
            <CardHeader>
              <CardTitle className="text-navy">{wallet.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address:</span>
                  <span className="font-mono">{wallet.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Balance:</span>
                  <span>{wallet.balance}</span>
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
        
        {wallets.length === 0 && (
          <div className="col-span-2 text-center py-12 glass-form">
            <p className="text-muted-foreground mb-4">You don't have any wallets yet.</p>
            <Button asChild className="gold-gradient text-navy hover:opacity-90">
              <Link to="/wallet/create">
                <Plus className="mr-2 h-4 w-4" /> Create Your First Wallet
              </Link>
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex justify-center mt-12 gap-4">
        <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
          <Link to="/onramp">Buy Crypto</Link>
        </Button>
        <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold/10">
          <Link to="/offramp">Sell Crypto</Link>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
