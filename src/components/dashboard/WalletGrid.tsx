
import React from 'react';
import WalletCard from './WalletCard';
import CreateWalletCard from './CreateWalletCard';

interface Asset {
  symbol: string;
  amount: string;
  value: string;
}

interface WalletGridProps {
  wallets: Array<{
    address: string;
    name: string;
    balance: string;
    signers: number;
    threshold: number;
    type: 'personal' | 'multiparty';
    assets?: Asset[];
  }>;
  isLoading: boolean;
}

const WalletGrid: React.FC<WalletGridProps> = ({ wallets, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="paper-card p-6 animate-pulse">
            <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
            <div className="h-5 bg-white/10 rounded w-2/3 mb-3"></div>
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (wallets.length === 0) {
    return (
      <div className="text-center py-8 text-white/70 border border-dashed border-gold/20 rounded-lg p-8">
        <p className="mb-4">You don't have any wallets yet.</p>
        <CreateWalletCard />
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {wallets.map((wallet) => (
        <WalletCard key={wallet.address} wallet={wallet} />
      ))}
      <CreateWalletCard />
    </div>
  );
};

export default WalletGrid;
