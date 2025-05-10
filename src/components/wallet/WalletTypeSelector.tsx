
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';

interface WalletTypeSelectorProps {
  walletType: string;
  onWalletTypeChange: (value: string) => void;
}

const WalletTypeSelector = ({ walletType, onWalletTypeChange }: WalletTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label>Wallet Type</Label>
      <RadioGroup
        defaultValue="personal"
        value={walletType}
        onValueChange={onWalletTypeChange}
        className="grid grid-cols-2 gap-4"
      >
        <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-accent cursor-pointer">
          <RadioGroupItem value="personal" id="personal" />
          <Label htmlFor="personal" className="cursor-pointer flex-1">
            <div className="font-medium">Personal Wallet</div>
            <p className="text-sm text-muted-foreground">
              Simple wallet controlled by a single address. Recommended for personal use.
            </p>
          </Label>
        </div>
        <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-accent cursor-pointer">
          <RadioGroupItem value="multiparty" id="multiparty" />
          <Label htmlFor="multiparty" className="cursor-pointer flex-1">
            <div className="font-medium">Multi-Party Wallet</div>
            <p className="text-sm text-muted-foreground">
              Advanced security with multiple signers. Ideal for teams and organizations.
            </p>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default WalletTypeSelector;
