
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  @ApiOperation({ summary: 'Verify admin authentication' })
  @ApiResponse({ status: 200, description: 'Admin authentication verified' })
  @ApiBearerAuth()
  verifyAuth(@Request() req) {
    return { 
      isAdmin: true,
      userId: req.user.id 
    };
  }
}
