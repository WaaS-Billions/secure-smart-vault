
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Wallet, Activity, TrendingUp } from 'lucide-react';

interface SummaryCardsProps {
  totalBalance: string;
  wallets: Array<{
    type: 'personal' | 'multiparty';
  }>;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalBalance, wallets }) => {
  const personalWallets = wallets.filter(w => w.type === 'personal').length;
  const multiPartyWallets = wallets.filter(w => w.type === 'multiparty').length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="paper-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-gold flex items-center text-lg">
            <Wallet className="mr-2 h-5 w-5" /> Total Balance
          </CardTitle>
          <CardDescription className="text-white/70">Across all wallets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gold">{totalBalance} ETH</div>
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
            {personalWallets} Personal,&nbsp;
            {multiPartyWallets} Multi-party
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
  );
};

export default SummaryCards;
