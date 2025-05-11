
import React from 'react';
import { Button } from '@/components/ui/button';

interface WalletFormFooterProps {
  isSubmitting: boolean;
}

const WalletFormFooter = ({ isSubmitting }: WalletFormFooterProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        variant="outline"
        type="button"
        onClick={() => window.history.back()}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Create Wallet'}
      </Button>
    </div>
  );
};

export default WalletFormFooter;
