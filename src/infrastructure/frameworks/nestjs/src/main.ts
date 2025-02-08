import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FixturesService } from './services/fixtures.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.ENVIRONMENT === 'development') {
    const fixturesService = app.get(FixturesService);
    await fixturesService.clearDatabase();
    await fixturesService.loadFixtures();
  }

  await app.listen(process.env.PORT ?? 5002);
}
bootstrap();
