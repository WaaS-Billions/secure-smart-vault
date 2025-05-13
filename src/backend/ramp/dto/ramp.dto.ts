
import { IsNotEmpty, IsNumber, IsString, IsEnum, Min, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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

export class OnRampDto {
  @IsNumber()
  @Min(10)
  @IsNotEmpty()
  amount: number;

  @IsEnum(FiatCurrency)
  @IsNotEmpty()
  fiatCurrency: FiatCurrency;

  @IsString()
  @IsNotEmpty()
  cryptoAsset: string;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsString()
  @IsOptional()
  callbackUrl?: string;

  @IsString()
  @IsOptional()
  userId?: string;
}

export class OffRampDto {
  @IsNumber()
  @Min(10)
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  cryptoAsset: string;

  @IsEnum(FiatCurrency)
  @IsNotEmpty()
  fiatCurrency: FiatCurrency;

  @IsString()
  @IsNotEmpty()
  bankAccountId: string;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}

export class QuoteResponseDto {
  @IsNumber()
  amountToReceive: number;

  @IsNumber()
  fee: number;

  @IsNumber()
  rate: number;

  @IsString()
  estimatedTime: string;
}

export class TransactionRequestDto {
  @ValidateNested()
  @Type(() => OnRampDto)
  onRampDetails: OnRampDto;
}
