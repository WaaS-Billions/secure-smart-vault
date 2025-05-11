
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gold">Non-Custodial Smart Wallet Platform</h1>
        <p className="text-xl mb-8 text-white/90">
          Create and manage secure, non-custodial smart wallets with multi-signature capabilities
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col items-center p-6 glass-form">
            <h2 className="text-xl font-bold mb-2 text-navy">Manage Wallets</h2>
            <p className="text-center text-muted-foreground mb-4">
              Create and manage your smart wallets with multi-signature security
            </p>
            <div className="mt-auto">
              <Button asChild size="lg" className="w-full gold-gradient text-navy hover:opacity-90">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col items-center p-6 glass-form">
            <h2 className="text-xl font-bold mb-2 text-navy">Create New Wallet</h2>
            <p className="text-center text-muted-foreground mb-4">
              Set up a new non-custodial smart wallet for your assets
            </p>
            <div className="mt-auto">
              <Button asChild variant="outline" size="lg" className="w-full border-gold text-gold hover:bg-gold/10">
                <Link to="/wallet/create">Create Wallet</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center p-6 glass-form">
            <h2 className="text-xl font-bold mb-2 text-navy">Buy Crypto</h2>
            <p className="text-center text-muted-foreground mb-4">
              Purchase cryptocurrency with your credit card or bank account
            </p>
            <div className="mt-auto">
              <Button asChild variant="outline" size="lg" className="w-full border-gold text-gold hover:bg-gold/10">
                <Link to="/onramp">On-Ramp</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col items-center p-6 glass-form">
            <h2 className="text-xl font-bold mb-2 text-navy">Sell Crypto</h2>
            <p className="text-center text-muted-foreground mb-4">
              Convert your cryptocurrency to fiat and withdraw to your bank
            </p>
            <div className="mt-auto">
              <Button asChild variant="outline" size="lg" className="w-full border-gold text-gold hover:bg-gold/10">
                <Link to="/offramp">Off-Ramp</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
