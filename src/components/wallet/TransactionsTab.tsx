
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { ArrowLeftRight } from "lucide-react";
import TransactionItem from './TransactionItem';

interface Transaction {
  hash: string;
  to: string;
  value: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  confirmations: number;
}

interface TransactionsTabProps {
  transactions: Transaction[];
  threshold: number;
}

const TransactionsTab = ({ transactions, threshold }: TransactionsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ArrowLeftRight className="mr-2 h-5 w-5" />
          Transaction History
        </CardTitle>
        <CardDescription>
          All transactions for this wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No transactions yet
          </p>
        ) : (
          <div className="space-y-6">
            {transactions.map((tx) => (
              <TransactionItem 
                key={tx.hash} 
                transaction={tx} 
                threshold={threshold} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsTab;
