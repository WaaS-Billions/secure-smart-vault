
import { IsNotEmpty, IsNumber, IsString, IsEnum, Min, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum FiatCurrency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

export enum PaymentMethod {
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
}

export enum RampType {
  ON_RAMP = 'onramp',
  OFF_RAMP = 'offramp',
}

export class OnRampDto {
  @ApiProperty({ example: 100, description: 'Amount to convert' })
  @IsNumber()
  @Min(10)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: FiatCurrency, example: FiatCurrency.USD })
  @IsEnum(FiatCurrency)
  @IsNotEmpty()
  fiatCurrency: FiatCurrency;

  @ApiProperty({ example: 'ETH', description: 'Cryptocurrency asset' })
  @IsString()
  @IsNotEmpty()
  cryptoAsset: string;

  @ApiProperty({ example: '0x1234...', description: 'Wallet address' })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.CARD })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @ApiProperty({ required: false, example: 'https://example.com/callback' })
  @IsString()
  @IsOptional()
  callbackUrl?: string;

  @ApiProperty({ required: false, example: 'user123' })
  @IsString()
  @IsOptional()
  userId?: string;
}

export class OffRampDto {
  @ApiProperty({ example: 100, description: 'Amount to convert' })
  @IsNumber()
  @Min(10)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'ETH', description: 'Cryptocurrency asset' })
  @IsString()
  @IsNotEmpty()
  cryptoAsset: string;

  @ApiProperty({ enum: FiatCurrency, example: FiatCurrency.USD })
  @IsEnum(FiatCurrency)
  @IsNotEmpty()
  fiatCurrency: FiatCurrency;

  @ApiProperty({ example: 'bank123', description: 'Bank account ID' })
  @IsString()
  @IsNotEmpty()
  bankAccountId: string;

  @ApiProperty({ example: '0x1234...', description: 'Wallet address' })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}

export class QuoteResponseDto {
  @ApiProperty()
  @IsNumber()
  amountToReceive: number;

  @ApiProperty()
  @IsNumber()
  fee: number;

  @ApiProperty()
  @IsNumber()
  rate: number;

  @ApiProperty()
  @IsString()
  estimatedTime: string;
}

export class TransactionRequestDto {
  @ApiProperty({ type: OnRampDto })
  @ValidateNested()
  @Type(() => OnRampDto)
  onRampDetails: OnRampDto;
}

export class RampQuoteDto {
  @ApiProperty({ example: 100, description: 'Amount to convert' })
  @IsNumber()
  @Min(10)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ enum: FiatCurrency, example: FiatCurrency.USD })
  @IsEnum(FiatCurrency)
  @IsNotEmpty()
  fiatCurrency: FiatCurrency;

  @ApiProperty({ example: 'ETH', description: 'Cryptocurrency asset' })
  @IsString()
  @IsNotEmpty()
  cryptoAsset: string;

  @ApiProperty({ enum: ['onramp', 'offramp'], example: 'onramp' })
  @IsString()
  @IsNotEmpty()
  type: 'onramp' | 'offramp';
}
