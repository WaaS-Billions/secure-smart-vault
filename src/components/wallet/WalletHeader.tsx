
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface WalletHeaderProps {
  name: string;
  address?: string;
  balance?: string;
}

const WalletHeader = ({ name, address, balance }: WalletHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-2">
        <h1 className="text-3xl font-bold text-gold">{name}</h1>
      </div>
      
      {(address || balance) && (
        <div className="hidden md:block glass-form px-4 py-2">
          {address && (
            <p className="text-sm text-muted-foreground">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          )}
          {balance && (
            <p className="text-lg font-semibold text-navy">{balance}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletHeader;
