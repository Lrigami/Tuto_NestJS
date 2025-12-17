import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Allow to use personalised DTO
  app.useGlobalGuards(new AuthGuard()); // Allow AuthGuard to be used globally
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
