
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply Helmet for security headers
  app.use(helmet());
  
  // Enable CORS for frontend
  app.enableCors();
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('Smart Wallet API')
    .setDescription('API for non-custodial smart wallet with MPC')
    .setVersion('1.0')
    .addTag('wallets')
    .addTag('auth')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
