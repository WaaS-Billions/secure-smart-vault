
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
    <Card className="mb-6 bg-navy border-gold/30">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gold/80">Rate</span>
            <span className="font-medium text-white">
              1 {cryptoAsset} = {quote.rate.toFixed(2)} {fiatCurrency}
            </span>
          </div>
          
          {type === 'onramp' ? (
            <>
              <div className="flex justify-between">
                <span className="text-gold/80">You pay</span>
                <span className="font-medium text-white">
                  {quote.fiatAmount?.toFixed(2)} {fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold/80">Fee</span>
                <span className="font-medium text-white">
                  {quote.fee.toFixed(2)} {fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold/80">Total</span>
                <span className="font-medium text-white">
                  {quote.totalFiatAmount?.toFixed(2)} {fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold/80">You receive</span>
                <span className="font-medium text-white">
                  {quote.cryptoAmount?.toFixed(6)} {cryptoAsset}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-gold/80">You send</span>
                <span className="font-medium text-white">
                  {quote.cryptoAmount?.toFixed(6)} {cryptoAsset}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold/80">You receive</span>
                <span className="font-medium text-white">
                  {quote.fiatAmount?.toFixed(2)} {fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold/80">Fee</span>
                <span className="font-medium text-white">
                  {quote.fee.toFixed(2)} {fiatCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gold/80">Net amount</span>
                <span className="font-medium text-white">
                  {quote.netFiatAmount?.toFixed(2)} {fiatCurrency}
                </span>
              </div>
            </>
          )}
          
          <div className="flex justify-between text-sm">
            <span className="text-gold/80">Quote expires in</span>
            <span className="text-orange-500">{minutesRemaining} minutes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
