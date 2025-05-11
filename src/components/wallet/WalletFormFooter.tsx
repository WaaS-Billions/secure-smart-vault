
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface WalletFormFooterProps {
  isSubmitting: boolean;
}

const WalletFormFooter = ({ isSubmitting }: WalletFormFooterProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end space-x-4">
      <Button
        type="button"
        variant="outline"
        className="border-gold text-gold hover:bg-gold/10"
        onClick={() => navigate(-1)}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        className="gold-gradient text-navy hover:opacity-90"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Create Wallet'}
      </Button>
    </div>
  );
};

export default WalletFormFooter;
