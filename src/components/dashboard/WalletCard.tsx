
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet } from 'lucide-react';

interface WalletCardProps {
  wallet: {
    address: string;
    name: string;
    balance: string;
    signers: number;
    threshold: number;
    type: 'personal' | 'multiparty';
  };
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
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
  );
};

export default WalletCard;
