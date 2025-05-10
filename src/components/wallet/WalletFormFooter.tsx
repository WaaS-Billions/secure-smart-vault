
import React from 'react';
import { Button } from '@/components/ui/button';

interface WalletFormFooterProps {
  onCancel: () => void;
  isCreating: boolean;
  isConnected: boolean;
}

const WalletFormFooter = ({ onCancel, isCreating, isConnected }: WalletFormFooterProps) => {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onCancel}
        type="button"
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isCreating || !isConnected}
      >
        {isCreating ? 'Creating...' : 'Create Wallet'}
      </Button>
    </div>
  );
};

export default WalletFormFooter;
