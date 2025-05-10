
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Non-Custodial Smart Wallet Platform</h1>
        <p className="text-xl mb-8">
          Create and manage secure, non-custodial smart wallets with multi-signature capabilities
        </p>
        
        <div className="space-x-4">
          <Button asChild size="lg">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/wallet/create">Create Wallet</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
