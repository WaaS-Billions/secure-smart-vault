
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsArray, Min, IsNotEmpty, IsOptional } from 'class-validator';

export enum WalletType {
  PERSONAL = 'personal',
  MULTIPARTY = 'multiparty',
}

export class CreateWalletDto {
  @ApiProperty({ description: 'Wallet name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Wallet type', enum: WalletType, default: WalletType.MULTIPARTY })
  @IsEnum(WalletType)
  @IsOptional()
  type: WalletType;

  @ApiProperty({ description: 'Array of signer addresses' })
  @IsArray()
  signers: string[];

  @ApiProperty({ description: 'Number of signatures required for transactions' })
  @IsNumber()
  @Min(1)
  threshold: number;
}

export class TransactionDto {
  @ApiProperty({ description: 'Recipient address' })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ description: 'Amount to send' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ description: 'Transaction data (optional)' })
  @IsString()
  @IsOptional()
  data?: string;
}
