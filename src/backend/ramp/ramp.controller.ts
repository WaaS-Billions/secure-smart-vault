
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RampService } from './ramp.service';
import { OnRampDto, OffRampDto, QuoteDto } from './dto/ramp.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('ramp')
@Controller('ramp')
export class RampController {
  constructor(private readonly rampService: RampService) {}

  @Post('quote')
  @ApiOperation({ summary: 'Get a quote for on/off-ramp' })
  async getQuote(@Body() quoteDto: QuoteDto) {
    return this.rampService.getQuote(quoteDto);
  }

  @Post('onramp')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create on-ramp transaction' })
  @ApiBearerAuth()
  async onRamp(@Req() req: Request, @Body() onRampDto: OnRampDto) {
    return this.rampService.createOnRamp(req.user['id'], onRampDto);
  }

  @Post('offramp')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create off-ramp transaction' })
  @ApiBearerAuth()
  async offRamp(@Req() req: Request, @Body() offRampDto: OffRampDto) {
    return this.rampService.createOffRamp(req.user['id'], offRampDto);
  }
}
