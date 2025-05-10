
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber, IsEthereumAddress, IsOptional, Min } from 'class-validator';

export class CreateWalletDto {
  @ApiProperty({ description: 'Wallet name' })
  @IsString()
  name: string;
  
  @ApiProperty({ description: 'List of signer addresses', type: [String] })
  @IsArray()
  @IsEthereumAddress({ each: true })
  signers: string[];
  
  @ApiProperty({ description: 'Number of signatures required', minimum: 1 })
  @IsNumber()
  @Min(1)
  threshold: number;
}

export class TransactionDto {
  @ApiProperty({ description: 'Recipient address' })
  @IsEthereumAddress()
  to: string;
  
  @ApiProperty({ description: 'Transaction value in wei' })
  @IsString()
  value: string;
  
  @ApiProperty({ description: 'Transaction data (hex)', required: false })
  @IsOptional()
  @IsString()
  data?: string;
}
