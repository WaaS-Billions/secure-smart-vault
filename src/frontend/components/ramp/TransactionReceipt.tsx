
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Download } from 'lucide-react';

interface TransactionReceiptProps {
  transaction: {
    id: string;
    date: string;
    amount: number;
    cryptoAsset: string;
    fiatAmount: number;
    fiatCurrency: string;
    status: string;
    paymentDetails?: string;
    txHash?: string;
  };
}

export const TransactionReceipt: React.FC<TransactionReceiptProps> = ({ transaction }) => {
  const handleDownload = () => {
    // Create receipt content
    const receiptContent = `
      TRANSACTION RECEIPT
      ==================
      Transaction ID: ${transaction.id}
      Date: ${transaction.date}
      Status: ${transaction.status}
      
      Amount: ${transaction.amount} ${transaction.cryptoAsset}
      Fiat Amount: ${transaction.fiatAmount} ${transaction.fiatCurrency}
      
      ${transaction.txHash ? `Transaction Hash: ${transaction.txHash}` : ''}
      
      This is your official receipt for your crypto off-ramp transaction.
      Reference this transaction ID for any inquiries.
    `;
    
    // Create blob and download
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${transaction.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Transaction Receipt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Transaction ID:</span>
          <span className="font-medium">{transaction.id}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Date:</span>
          <span>{transaction.date}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Crypto Amount:</span>
          <span>{transaction.amount} {transaction.cryptoAsset}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Fiat Amount:</span>
          <span>{transaction.fiatAmount} {transaction.fiatCurrency}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status:</span>
          <span className={`font-medium ${
            transaction.status === 'completed' ? 'text-green-600' : 
            transaction.status === 'pending' ? 'text-amber-600' : 
            'text-red-600'
          }`}>
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </span>
        </div>
        
        {transaction.txHash && (
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground">Transaction Hash:</span>
            <span className="text-xs break-all">{transaction.txHash}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleDownload} 
          className="w-full"
          variant="outline"
        >
          <Download className="mr-2 h-4 w-4" /> Download Receipt
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionReceipt;
