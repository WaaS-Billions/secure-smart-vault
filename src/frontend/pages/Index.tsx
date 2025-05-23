
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-2 text-gold">Daily Wallet</h1>
        <p className="text-xl mb-10 text-white/90">
          Non-custodial smart wallet for borderless remittance and payments
        </p>
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center mb-16">
          <Button asChild size="lg" className="bg-gold text-navy hover:bg-gold/90 px-10 py-6 text-lg">
            <Link to="/get-started">Get Started</Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="border-gold text-gold hover:bg-gold/10 px-10 py-6 text-lg">
            <Link to="/dashboard">Already have a Wallet</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="glass-form p-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-3 text-navy">Secure</h3>
            <p className="text-center text-muted-foreground">Non-custodial smart contracts keep your assets safe</p>
          </div>
          
          <div className="glass-form p-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-3 text-navy">Borderless</h3>
            <p className="text-center text-muted-foreground">Send payments anywhere in the world instantly</p>
          </div>
          
          <div className="glass-form p-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-3 text-navy">Affordable</h3>
            <p className="text-center text-muted-foreground">Lower fees than traditional remittance services</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
