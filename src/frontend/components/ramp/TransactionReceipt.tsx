
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { download, receipt } from 'lucide-react';

interface TransactionReceiptProps {
  transaction: {
    referenceNumber: string;
    status: string;
    sender: string;
    cryptoAsset: string;
    cryptoAmount: number;
    fiatCurrency: string;
    fiatAmount: number;
    timestamp: number;
    paymentDetails?: string;
  };
}

const TransactionReceipt: React.FC<TransactionReceiptProps> = ({ transaction }) => {
  const formattedDate = new Date(transaction.timestamp).toLocaleString();
  const timeAgo = formatDistanceToNow(new Date(transaction.timestamp), { addSuffix: true });

  const downloadReceipt = () => {
    // Create receipt content
    const receiptContent = `
TRANSACTION RECEIPT
===================

Reference Number: ${transaction.referenceNumber}
Status: ${transaction.status}
Date: ${formattedDate}

FROM:
${transaction.sender}

AMOUNT:
${transaction.cryptoAmount} ${transaction.cryptoAsset} → ${transaction.fiatAmount} ${transaction.fiatCurrency}

${transaction.paymentDetails ? `PAYMENT DETAILS:\n${transaction.paymentDetails}` : ''}

Transaction processed ${timeAgo}
    `;

    // Create blob and download
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${transaction.referenceNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <receipt className="mr-2 h-5 w-5" />
              Transaction Receipt
            </CardTitle>
            <CardDescription>
              Transaction completed {timeAgo}
            </CardDescription>
          </div>
          <div className={`px-3 py-1 text-xs rounded-full ${
            transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
            transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-gray-100 text-gray-800'
          }`}>
            {transaction.status}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Reference Number</p>
            <p className="font-mono text-sm">{transaction.referenceNumber}</p>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">From</p>
              <p className="font-mono text-sm break-all">{transaction.sender}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Date</p>
              <p className="text-sm">{formattedDate}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Crypto Amount</p>
              <p className="text-sm font-medium">
                {transaction.cryptoAmount} {transaction.cryptoAsset}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fiat Amount</p>
              <p className="text-sm font-medium">
                {transaction.fiatAmount.toLocaleString(undefined, {
                  style: 'currency',
                  currency: transaction.fiatCurrency
                })}
              </p>
            </div>
          </div>
          
          {transaction.paymentDetails && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment Details</p>
                <p className="text-sm whitespace-pre-line">{transaction.paymentDetails}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 flex justify-end">
        <Button onClick={downloadReceipt} variant="outline">
          <download className="mr-2 h-4 w-4" />
          Download Receipt
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionReceipt;
