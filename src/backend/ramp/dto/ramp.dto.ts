
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, Min, Matches } from 'class-validator';

export enum FiatCurrency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BANK_TRANSFER = 'bank_transfer',
}

export class OnRampDto {
  @ApiProperty({ description: 'Amount to convert', example: 100 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @ApiProperty({ description: 'Fiat currency', enum: FiatCurrency, example: 'USD' })
  @IsEnum(FiatCurrency)
  @IsNotEmpty()
  fiatCurrency: FiatCurrency;

  @ApiProperty({ description: 'Crypto asset symbol', example: 'ETH' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]+$/)
  cryptoAsset: string;

  @ApiProperty({ description: 'Destination wallet address', example: '0x1234...' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^0x[a-fA-F0-9]{40}$/)
  walletAddress: string;

  @ApiProperty({ description: 'Payment method', enum: PaymentMethod, example: 'credit_card' })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;
}

export class OffRampDto {
  @ApiProperty({ description: 'Amount to convert', example: 0.5 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  amount: number;
  
  @ApiProperty({ description: 'Crypto asset symbol', example: 'ETH' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]+$/)
  cryptoAsset: string;
  
  @ApiProperty({ description: 'Bank account ID for payout', example: 'ba_123456' })
  @IsString()
  @IsNotEmpty()
  bankAccountId: string;
  
  @ApiProperty({ description: 'Destination fiat currency', enum: FiatCurrency, example: 'USD' })
  @IsEnum(FiatCurrency)
  @IsNotEmpty()
  fiatCurrency: FiatCurrency;
}

export class QuoteDto {
  @ApiProperty({ description: 'Ramp type (on_ramp or off_ramp)', example: 'on_ramp' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(['on_ramp', 'off_ramp'])
  type: 'on_ramp' | 'off_ramp';

  @ApiProperty({ description: 'Amount to convert', example: 100 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @ApiProperty({ description: 'Fiat currency', enum: FiatCurrency, example: 'USD' })
  @IsEnum(FiatCurrency)
  @IsNotEmpty()
  fiatCurrency: FiatCurrency;

  @ApiProperty({ description: 'Crypto asset symbol', example: 'ETH' })
  @IsString()
  @IsNotEmpty()
  cryptoAsset: string;
}
