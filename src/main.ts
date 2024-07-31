import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const isSwaggerEnabled = configService.get<boolean>('SWAGGER_ENABLED');

  if (isSwaggerEnabled) {
    const config = new DocumentBuilder()
      .setTitle('File Processing API')
      .setDescription('API for processing and managing files')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
