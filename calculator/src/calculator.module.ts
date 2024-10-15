import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVALUATOR_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.EVALUATOR_HOST || 'localhost',
          port: Number(process.env.EVALUATOR_PORT || '3001'),
        },
      },
    ]),
  ],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {}
