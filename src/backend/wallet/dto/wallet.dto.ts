
import { IsString, IsNotEmpty, IsArray, IsNumber, Min, Max, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum WalletType {
  PERSONAL = 'personal',
  MULTIPARTY = 'multiparty',
}

export class CreateWalletDto {
  @ApiProperty({ description: 'Name of the wallet' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'List of signer addresses for this wallet' })
  @IsArray()
  @IsString({ each: true })
  signers: string[];

  @ApiProperty({ description: 'Minimum number of signatures required for a transaction' })
  @IsNumber()
  @Min(1)
  threshold: number;

  @ApiProperty({ 
    description: 'Type of wallet', 
    enum: WalletType, 
    default: WalletType.MULTIPARTY 
  })
  @IsEnum(WalletType)
  @IsOptional()
  type?: WalletType = WalletType.MULTIPARTY;
}

export class TransactionDto {
  @ApiProperty({ description: 'Recipient address' })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ description: 'Transaction amount in wei' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ description: 'Transaction call data (hex encoded)' })
  @IsString()
  @IsOptional()
  data?: string;
}
