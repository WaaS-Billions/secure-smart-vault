
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ConnectWalletButton from '@/components/wallet/ConnectWalletButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy to-slate-900">
      <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-2 text-gold">Daily Wallet</h1>
          <p className="text-xl mb-10 text-white/90">
            Secure non-custodial smart wallet on Base chain
          </p>
          
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center mb-16">
            <ConnectWalletButton />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-3 text-gold">Non-Custodial</h3>
              <p className="text-center text-white/70">You control your private keys, we never have access</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-3 text-gold">Base Chain</h3>
              <p className="text-center text-white/70">Built on Base for fast, low-cost transactions</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-lg p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-3 text-gold">Secure</h3>
              <p className="text-center text-white/70">Smart contract security with your private wallet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
