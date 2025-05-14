
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

const CreateWalletCard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="flex flex-col items-center justify-center h-full border-dashed border-gold/20 paper-card cursor-pointer hover:border-gold/40 transition-colors"
      onClick={() => navigate('/wallet/create')}
    >
      <div className="py-8 flex flex-col items-center text-center px-4">
        <PlusCircle className="h-8 w-8 mb-2 text-gold" />
        <p className="font-medium text-gold">Create New Wallet</p>
        <p className="text-sm text-white/70 mt-1">
          Add another smart wallet to your account
        </p>
      </div>
    </Card>
  );
};

export default CreateWalletCard;
