
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply security middleware
  app.use(helmet());
  
  // Enable CORS
  app.enableCors();
  
  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Daily Wallet API')
    .setDescription('API for Daily Wallet blockchain application')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Start server
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
