import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
