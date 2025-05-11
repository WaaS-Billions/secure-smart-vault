
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionItem from './TransactionItem';

interface Transaction {
  id?: string;
  hash?: string;
  from?: string;
  to: string;
  value?: string;
  amount?: string;
  status: 'pending' | 'confirmed' | 'failed' | 'completed';
  timestamp?: string;
  date?: string;
  confirmations?: number;
  requiredConfirmations?: number;
  type?: string;
}

interface TransactionsTabProps {
  transactions: Transaction[];
  threshold?: number;
}

const TransactionsTab = ({ transactions, threshold = 2 }: TransactionsTabProps) => {
  return (
    <Card className="glass-form">
      <CardHeader>
        <CardTitle className="text-navy">Transaction History</CardTitle>
        <CardDescription>
          View all transactions for this wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {transactions.map((transaction) => (
              <TransactionItem 
                key={transaction.id || transaction.hash} 
                transaction={transaction}
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
