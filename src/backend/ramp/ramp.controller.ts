
import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Req, 
  Get, 
  Query 
} from '@nestjs/common';
import { RampService } from './ramp.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OnRampDto, OffRampDto, RampQuoteDto } from './dto/ramp.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('ramp')
@Controller('ramp')
export class RampController {
  constructor(private readonly rampService: RampService) {}

  @Post('onramp')
  @ApiOperation({ summary: 'Create an on-ramp transaction' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createOnRamp(@Req() req: Request, @Body() onRampDto: OnRampDto) {
    return this.rampService.createOnRamp(req.user['id'], onRampDto);
  }

  @Post('offramp')
  @ApiOperation({ summary: 'Create an off-ramp transaction' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createOffRamp(@Req() req: Request, @Body() offRampDto: OffRampDto) {
    return this.rampService.createOffRamp(req.user['id'], offRampDto);
  }

  @Post('quote')
  @ApiOperation({ summary: 'Get a quote for ramp operation' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getQuote(@Body() quoteDto: RampQuoteDto) {
    return this.rampService.getQuote(quoteDto);
  }
}
