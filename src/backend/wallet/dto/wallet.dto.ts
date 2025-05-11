
import { IsString, IsArray, IsEnum, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum WalletType {
  PERSONAL = 'personal',
  MULTIPARTY = 'multiparty'
}

export class CreateWalletDto {
  @ApiProperty({ description: 'Name of the wallet' })
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'Type of wallet',
    enum: WalletType,
    default: WalletType.PERSONAL
  })
  @IsEnum(WalletType)
  @IsOptional()
  type: WalletType = WalletType.PERSONAL;

  @ApiProperty({ 
    description: 'Array of signer addresses',
    type: [String]
  })
  @IsArray()
  signers: string[];

  @ApiProperty({
    description: 'Number of required signers for transactions',
    default: 1,
    minimum: 1
  })
  @IsInt()
  @Min(1)
  threshold: number;
}

export class TransactionDto {
  @ApiProperty({ description: 'Destination address' })
  @IsString()
  to: string;

  @ApiProperty({ description: 'Amount of ETH to send' })
  value: string;

  @ApiProperty({ 
    description: 'Transaction data (for contract interactions)',
    required: false
  })
  @IsOptional()
  @IsString()
  data?: string;
}

export class OffRampDto {
  @ApiProperty({ description: 'Amount of crypto to sell' })
  amount: number;

  @ApiProperty({ description: 'Type of crypto asset (ETH, BTC, etc)' })
  @IsString()
  cryptoAsset: string;

  @ApiProperty({ description: 'Fiat currency to receive (USD, EUR, GBP)' })
  @IsString()
  fiatCurrency: string;

  @ApiProperty({ description: 'Wallet address to send funds from' })
  @IsString()
  walletAddress: string;

  @ApiProperty({ description: 'Payment details for receiving fiat' })
  @IsString()
  paymentDetails: string;
}
