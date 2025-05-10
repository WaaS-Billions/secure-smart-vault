
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateWalletDto, TransactionDto } from './dto/wallet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('wallets')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wallet' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createWallet(@Request() req, @Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(req.user.id, createWalletDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wallets for a user' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getWallets(@Request() req) {
    return this.walletService.getWallets(req.user.id);
  }

  @Get(':address')
  @ApiOperation({ summary: 'Get wallet details by address' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getWallet(@Request() req, @Param('address') address: string) {
    return this.walletService.getWallet(req.user.id, address);
  }

  @Post(':address/transaction')
  @ApiOperation({ summary: 'Create a new transaction' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createTransaction(
    @Request() req,
    @Param('address') address: string,
    @Body() transactionDto: TransactionDto,
  ) {
    return this.walletService.createTransaction(req.user.id, address, transactionDto);
  }
}
