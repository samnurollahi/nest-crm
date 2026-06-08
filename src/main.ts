import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  //? swagger config
  const swaggerConfig = SwaggerConfig.getInstance(app);
  process.env.NODE_ENV == 'DEVELOPMENT' && swaggerConfig.setup();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
