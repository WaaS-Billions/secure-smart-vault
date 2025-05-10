
import { Injectable, BadRequestException } from '@nestjs/common';
import { OnRampDto, OffRampDto, RampQuoteDto, RampType } from './dto/ramp.dto';

@Injectable()
export class RampService {
  // For a real implementation, this would integrate with actual on/off ramp providers
  // like Moonpay, Ramp, or Simplex for on-ramping and Banxa or similar for off-ramping
  
  async createOnRamp(userId: string, onRampDto: OnRampDto) {
    try {
      // Simulate response from third-party on-ramp provider
      const estimatedCryptoAmount = this.estimateCryptoAmount(onRampDto.amount, onRampDto.cryptoAsset);
      const fee = onRampDto.amount * 0.03; // Example: 3% fee
      
      return {
        id: `onramp-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId,
        ...onRampDto,
        estimatedCryptoAmount,
        fee,
        totalFiatAmount: onRampDto.amount + fee,
        paymentUrl: `https://example-onramp-provider.com/pay/${Date.now()}`,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to create on-ramp: ${error.message}`);
    }
  }
  
  async createOffRamp(userId: string, offRampDto: OffRampDto) {
    try {
      // Simulate response from third-party off-ramp provider
      const estimatedFiatAmount = this.estimateFiatAmount(offRampDto.amount, offRampDto.cryptoAsset, offRampDto.fiatCurrency);
      const fee = estimatedFiatAmount * 0.03; // Example: 3% fee
      
      return {
        id: `offramp-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        userId,
        ...offRampDto,
        estimatedFiatAmount,
        fee,
        netFiatAmount: estimatedFiatAmount - fee,
        estimatedArrival: this.getEstimatedArrival(),
      };
    } catch (error) {
      throw new BadRequestException(`Failed to create off-ramp: ${error.message}`);
    }
  }
  
  async getQuote(quoteDto: RampQuoteDto) {
    try {
      if (quoteDto.type === RampType.ON_RAMP) {
        const cryptoAmount = this.estimateCryptoAmount(quoteDto.amount, quoteDto.cryptoAsset);
        const fee = quoteDto.amount * 0.03; // Example: 3% fee
        
        return {
          fiatAmount: quoteDto.amount,
          cryptoAmount,
          fee,
          totalFiatAmount: quoteDto.amount + fee,
          rate: cryptoAmount / quoteDto.amount,
          expiresAt: new Date(Date.now() + 15 * 60000).toISOString(), // 15 minutes from now
        };
      } else {
        const fiatAmount = this.estimateFiatAmount(quoteDto.amount, quoteDto.cryptoAsset, quoteDto.fiatCurrency);
        const fee = fiatAmount * 0.03; // Example: 3% fee
        
        return {
          cryptoAmount: quoteDto.amount,
          fiatAmount,
          fee,
          netFiatAmount: fiatAmount - fee,
          rate: fiatAmount / quoteDto.amount,
          expiresAt: new Date(Date.now() + 15 * 60000).toISOString(), // 15 minutes from now
        };
      }
    } catch (error) {
      throw new BadRequestException(`Failed to get quote: ${error.message}`);
    }
  }
  
  // Helper methods for simulating conversion rates
  private estimateCryptoAmount(fiatAmount: number, cryptoAsset: string): number {
    // In a real implementation, these rates would come from market data
    const rates: Record<string, number> = {
      'ETH': 0.0003, // $1 = 0.0003 ETH
      'BTC': 0.00002, // $1 = 0.00002 BTC
      'USDC': 1,  // $1 = 1 USDC
    };
    
    const rate = rates[cryptoAsset] || 0.0001;
    return fiatAmount * rate;
  }
  
  private estimateFiatAmount(cryptoAmount: number, cryptoAsset: string, fiatCurrency: string): number {
    // In a real implementation, these rates would come from market data
    const rates: Record<string, number> = {
      'ETH': 3333, // 1 ETH = $3333
      'BTC': 50000, // 1 BTC = $50000
      'USDC': 1,  // 1 USDC = $1
    };
    
    let rate = rates[cryptoAsset] || 1000;
    
    // Apply currency conversion if not USD
    if (fiatCurrency !== 'USD') {
      const fxRates: Record<string, number> = {
        'EUR': 0.85, // 1 USD = 0.85 EUR
        'GBP': 0.75, // 1 USD = 0.75 GBP
      };
      rate *= fxRates[fiatCurrency] || 1;
    }
    
    return cryptoAmount * rate;
  }
  
  private getEstimatedArrival(): string {
    // Simulate 2-3 business days for bank transfers
    const today = new Date();
    let daysToAdd = 2;
    
    // Skip weekends
    if (today.getDay() === 5) daysToAdd = 4; // Friday -> Tuesday
    if (today.getDay() === 6) daysToAdd = 3; // Saturday -> Tuesday
    
    const arrivalDate = new Date(today);
    arrivalDate.setDate(today.getDate() + daysToAdd);
    
    return arrivalDate.toISOString();
  }
}
