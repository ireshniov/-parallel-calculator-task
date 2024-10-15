import { NestFactory } from '@nestjs/core';
import { CalculatorModule } from './calculator.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CalculatorModule);

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      validationError: { target: false, value: false },
      exceptionFactory: (errors) => {
        return new BadRequestException(errors);
      },
      validateCustomDecorators: true,
    }),
  );

  app.enableCors();

  await app.listen(process.env.SERVER_PORT || '3000');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
