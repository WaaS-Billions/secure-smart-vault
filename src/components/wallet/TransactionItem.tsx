
import React from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

interface Transaction {
  hash: string;
  to: string;
  value: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  confirmations: number;
}

interface TransactionItemProps {
  transaction: Transaction;
  threshold: number;
  compact?: boolean;
}

const TransactionItem = ({ transaction, threshold, compact = false }: TransactionItemProps) => {
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  if (compact) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(transaction.status)}
            <p className="font-medium">
              {transaction.value} ETH
            </p>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            To: {transaction.to.substring(0, 6)}...{transaction.to.substring(38)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">
            {new Date(transaction.timestamp).toLocaleDateString()}
          </p>
          <p className="text-xs text-muted-foreground">
            {transaction.confirmations}/{threshold} signatures
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b pb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getStatusIcon(transaction.status)}
          <p className="font-medium">
            {transaction.value} ETH
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          {new Date(transaction.timestamp).toLocaleString()}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">To:</p>
          <p className="font-mono break-all">{transaction.to}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Transaction Hash:</p>
          <p className="font-mono break-all">{transaction.hash}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm text-muted-foreground">
          Confirmations: {transaction.confirmations}/{threshold}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
