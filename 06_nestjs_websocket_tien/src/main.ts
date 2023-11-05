import { NestFactory } from '@nestjs/core';
import { AppModule, envConfig } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as serveStatic from 'serve-static';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cors({
      origin: [envConfig.REDIRECT_URL, 'http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-xsrf-token'],
      exposedHeaders: ['Content-Type'],
    }),
  );
  app.use(cookieParser());
  app.use('/files', serveStatic(path.join(__dirname, '../public/images')));
  const PORT = 3000;
  await app.init();
  await app.listen(PORT, () => {
    console.log(`Sever is running in http://localhost:${PORT}/`);
  });
}
bootstrap();
