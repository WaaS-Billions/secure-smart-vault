
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Headers
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { CreateWalletDto, TransactionDto } from './dto/wallet.dto';

@ApiTags('wallets')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wallet' })
  @ApiHeader({ name: 'x-wallet-address', description: 'Connected wallet address' })
  async createWallet(@Headers('x-wallet-address') walletAddress: string, @Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(walletAddress, createWalletDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wallets for a user' })
  @ApiHeader({ name: 'x-wallet-address', description: 'Connected wallet address' })
  async getWallets(@Headers('x-wallet-address') walletAddress: string) {
    return this.walletService.getWallets(walletAddress);
  }

  @Get(':address')
  @ApiOperation({ summary: 'Get wallet details by address' })
  @ApiHeader({ name: 'x-wallet-address', description: 'Connected wallet address' })
  async getWallet(@Headers('x-wallet-address') walletAddress: string, @Param('address') address: string) {
    return this.walletService.getWallet(walletAddress, address);
  }

  @Post(':address/transaction')
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiHeader({ name: 'x-wallet-address', description: 'Connected wallet address' })
  async createTransaction(
    @Headers('x-wallet-address') walletAddress: string,
    @Param('address') address: string,
    @Body() transactionDto: TransactionDto,
  ) {
    return this.walletService.createTransaction(walletAddress, address, transactionDto);
  }
}
