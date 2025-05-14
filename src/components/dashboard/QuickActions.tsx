
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp, PlusCircle } from 'lucide-react';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gold">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Button 
          onClick={() => navigate('/onramp')} 
          variant="outline" 
          className="border-gold/20 text-gold hover:bg-gold/10 h-auto py-4 flex flex-col items-center"
        >
          <TrendingUp className="h-6 w-6 mb-2" />
          <span className="font-medium">Buy Crypto</span>
          <span className="text-xs text-white/70 mt-1">Deposit funds easily</span>
        </Button>
        
        <Button 
          onClick={() => navigate('/offramp')} 
          variant="outline" 
          className="border-gold/20 text-gold hover:bg-gold/10 h-auto py-4 flex flex-col items-center"
        >
          <TrendingUp className="h-6 w-6 mb-2 rotate-180" />
          <span className="font-medium">Sell Crypto</span>
          <span className="text-xs text-white/70 mt-1">Cash out to bank</span>
        </Button>
        
        <Button 
          onClick={() => navigate('/wallet/create')} 
          variant="outline" 
          className="border-gold/20 text-gold hover:bg-gold/10 h-auto py-4 flex flex-col items-center"
        >
          <PlusCircle className="h-6 w-6 mb-2" />
          <span className="font-medium">New Wallet</span>
          <span className="text-xs text-white/70 mt-1">Create multisig</span>
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
