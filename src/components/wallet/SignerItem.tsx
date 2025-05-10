
import React from 'react';
import { Shield } from 'lucide-react';

interface SignerProps {
  signer: {
    address: string;
    name: string;
  };
  isRequired: boolean;
  compact?: boolean;
}

const SignerItem = ({ signer, isRequired, compact = false }: SignerProps) => {
  if (compact) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{signer.name}</p>
          <p className="text-xs text-muted-foreground font-mono">
            {signer.address.substring(0, 6)}...{signer.address.substring(38)}
          </p>
        </div>
        {isRequired && (
          <Shield className="h-5 w-5 text-blue-500" />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <p className="font-medium">{signer.name}</p>
        <p className="text-sm text-muted-foreground font-mono break-all">
          {signer.address}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {isRequired && (
          <div className="flex items-center text-sm text-blue-500">
            <Shield className="h-4 w-4 mr-1" />
            Required
          </div>
        )}
      </div>
    </div>
  );
};

export default SignerItem;
