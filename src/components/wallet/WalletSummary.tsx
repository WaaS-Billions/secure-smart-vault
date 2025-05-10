
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftRight, Settings } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface WalletSummaryProps {
  address: string;
  balance: string;
  signers: Array<{
    address: string;
    name: string;
  }>;
  threshold: number;
}

const WalletSummary = ({ address, balance, signers, threshold }: WalletSummaryProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
            <p className="font-mono text-sm break-all">{address}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Balance</p>
            <p className="text-2xl font-bold">{balance} ETH</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Signers</p>
            <p className="font-medium">{signers.length} signers ({threshold} required)</p>
          </div>
        </div>
        <div className="flex mt-6 space-x-2">
          <Button onClick={() => navigate(`/wallet/${address}/send`)}>
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            Send
          </Button>
          <Button variant="outline" onClick={() => navigate(`/wallet/${address}/settings`)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletSummary;
