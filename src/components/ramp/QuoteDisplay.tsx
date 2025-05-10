
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface QuoteDisplayProps {
  quote: {
    fiatAmount?: number;
    cryptoAmount?: number;
    fee: number;
    totalFiatAmount?: number;
    netFiatAmount?: number;
    rate: number;
    expiresAt: string;
  };
  type: 'onramp' | 'offramp';
  fiatCurrency: string;
  cryptoAsset: string;
}

export function QuoteDisplay({ quote, type, fiatCurrency, cryptoAsset }: QuoteDisplayProps) {
  const expiryDate = new Date(quote.expiresAt);
  const minutesRemaining = Math.max(
    0, 
    Math.floor((expiryDate.getTime() - Date.now()) / 60000)
  );
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rate</span>
            <span className="font-medium">
              1 {cryptoAsset} = {quote.rate.toFixed(2)} {fiatCurrency}
            </span>
          </div>
          
          {type === 'onramp' ? (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">You pay</span>
                <span className="font-medium">
                  {quote.fiatAmount?.toFixed(2)} {fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-medium">
                  {quote.fee.toFixed(2)} {fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-medium">
                  {quote.totalFiatAmount?.toFixed(2)} {fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">You receive</span>
                <span className="font-medium">
                  {quote.cryptoAmount?.toFixed(6)} {cryptoAsset}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">You send</span>
                <span className="font-medium">
                  {quote.cryptoAmount?.toFixed(6)} {cryptoAsset}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">You receive</span>
                <span className="font-medium">
                  {quote.fiatAmount?.toFixed(2)} {fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-medium">
                  {quote.fee.toFixed(2)} {fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Net amount</span>
                <span className="font-medium">
                  {quote.netFiatAmount?.toFixed(2)} {fiatCurrency}
                </span>
              </div>
            </>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Quote expires in</span>
            <span className="text-orange-500">{minutesRemaining} minutes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
