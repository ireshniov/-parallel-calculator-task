import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { EvaluatorModule } from './evaluator.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EvaluatorModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.SERVER_HOST || 'localhost',
        port: Number(process.env.SERVER_PORT || '3001'),
        retryAttempts: 5,
        retryDelay: 3000,
      },
    },
  );
  await app.listen();
}

bootstrap();
