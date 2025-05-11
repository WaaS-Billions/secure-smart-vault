
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, Min, IsNotEmpty } from 'class-validator';

export enum RampType {
  ON_RAMP = 'on_ramp',
  OFF_RAMP = 'off_ramp',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'bank_transfer',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
}

export enum FiatCurrency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

export class OnRampDto {
  @ApiProperty({ description: 'Amount to on-ramp' })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ description: 'Fiat currency', enum: FiatCurrency })
  @IsEnum(FiatCurrency)
  fiatCurrency: FiatCurrency;

  @ApiProperty({ description: 'Crypto asset to receive (e.g., ETH, BTC)' })
  @IsString()
  @IsNotEmpty()
  cryptoAsset: string;
  
  @ApiProperty({ description: 'Wallet address to receive funds' })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @ApiProperty({ description: 'Payment method', enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}

export class OffRampDto {
  @ApiProperty({ description: 'Amount to off-ramp' })
  @IsNumber()
  @Min(0.0001)
  amount: number;

  @ApiProperty({ description: 'Crypto asset to sell (e.g., ETH, BTC)' })
  @IsString()
  @IsNotEmpty()
  cryptoAsset: string;

  @ApiProperty({ description: 'Fiat currency to receive', enum: FiatCurrency })
  @IsEnum(FiatCurrency)
  fiatCurrency: FiatCurrency;
  
  @ApiProperty({ description: 'Wallet address to send from' })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
  
  @ApiProperty({ description: 'Bank account or payment details' })
  @IsString()
  @IsNotEmpty()
  paymentDetails: string;
}

export class RampQuoteDto {
  @ApiProperty({ description: 'Type of ramp operation', enum: RampType })
  @IsEnum(RampType)
  type: RampType;

  @ApiProperty({ description: 'Amount to ramp' })
  @IsNumber()
  @Min(0.0001)
  amount: number;

  @ApiProperty({ description: 'Fiat currency', enum: FiatCurrency })
  @IsEnum(FiatCurrency)
  fiatCurrency: FiatCurrency;

  @ApiProperty({ description: 'Crypto asset', example: 'ETH' })
  @IsString()
  @IsNotEmpty()
  cryptoAsset: string;
}
