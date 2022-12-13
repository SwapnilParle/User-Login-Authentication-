import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: '*' });
  app.enableCors({ credentials: true });
  await app.listen(3000);
  console.log('App is running on localhost:3000...!');
}
bootstrap();
