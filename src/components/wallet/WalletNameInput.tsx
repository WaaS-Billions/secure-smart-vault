
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface WalletNameInputProps {
  walletName: string;
  onWalletNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WalletNameInput = ({ walletName, onWalletNameChange }: WalletNameInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="walletName">Wallet Name</Label>
      <Input
        id="walletName"
        placeholder="My Smart Wallet"
        value={walletName}
        onChange={onWalletNameChange}
        required
      />
    </div>
  );
};

export default WalletNameInput;
