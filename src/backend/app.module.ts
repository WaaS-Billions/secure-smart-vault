
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './wallet/wallet.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { RampModule } from './ramp/ramp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    WalletModule,
    AdminModule,
    AuthModule,
    RampModule,
  ],
})
export class AppModule {}
