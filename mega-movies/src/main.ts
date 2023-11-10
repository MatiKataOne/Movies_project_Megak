import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/', express.static('public'));
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
