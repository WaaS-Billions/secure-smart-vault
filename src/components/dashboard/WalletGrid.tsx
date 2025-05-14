
import React from 'react';
import WalletCard from './WalletCard';
import CreateWalletCard from './CreateWalletCard';

interface WalletGridProps {
  wallets: Array<{
    address: string;
    name: string;
    balance: string;
    signers: number;
    threshold: number;
    type: 'personal' | 'multiparty';
  }>;
  isLoading: boolean;
}

const WalletGrid: React.FC<WalletGridProps> = ({ wallets, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-8 text-white/70">Loading wallets...</div>;
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
