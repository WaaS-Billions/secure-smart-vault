
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface MultiPartySettingsProps {
  signers: string;
  threshold: string;
  onSignersChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onThresholdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  connectedAddress: string | undefined;
}

const MultiPartySettings = ({ 
  signers, 
  threshold, 
  onSignersChange, 
  onThresholdChange, 
  connectedAddress 
}: MultiPartySettingsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="signers">
          Additional Signers (One Ethereum address per line)
        </Label>
        <Textarea
          id="signers"
          placeholder="0x123...&#10;0x456...&#10;0x789..."
          value={signers}
          onChange={onSignersChange}
          rows={5}
        />
        <p className="text-sm text-muted-foreground">
          Your address ({connectedAddress ? `${connectedAddress.slice(0, 6)}...${connectedAddress.slice(-4)}` : 'Not connected'}) will be added automatically.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="threshold">
          Signature Threshold (How many signers are required)
        </Label>
        <Input
          id="threshold"
          type="number"
          min="1"
          value={threshold}
          onChange={onThresholdChange}
          required
        />
      </div>
    </>
  );
};

export default MultiPartySettings;
