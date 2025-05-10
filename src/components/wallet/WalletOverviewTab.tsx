
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, Users } from "lucide-react";
import TransactionItem from './TransactionItem';
import SignerItem from './SignerItem';

interface Transaction {
  hash: string;
  to: string;
  value: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  confirmations: number;
}

interface WalletOverviewTabProps {
  transactions: Transaction[];
  signers: Array<{
    address: string;
    name: string;
  }>;
  threshold: number;
  setActiveTab: (tab: string) => void;
}

const WalletOverviewTab = ({ transactions, signers, threshold, setActiveTab }: WalletOverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowLeftRight className="mr-2 h-5 w-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No transactions yet
            </p>
          ) : (
            <div className="space-y-4">
              {transactions.slice(0, 3).map((tx) => (
                <TransactionItem 
                  key={tx.hash} 
                  transaction={tx} 
                  threshold={threshold} 
                  compact 
                />
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setActiveTab('transactions')}
          >
            View All Transactions
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Signers
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {threshold} out of {signers.length} signatures required
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {signers.map((signer, index) => (
              <SignerItem 
                key={index} 
                signer={signer} 
                isRequired={index < threshold}
                compact 
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setActiveTab('signers')}
          >
            Manage Signers
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletOverviewTab;
