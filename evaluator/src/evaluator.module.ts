import { Module } from '@nestjs/common';
import { EvaluatorController } from './evaluator.controller';
import { EvaluatorService } from './evaluator.service';

@Module({
  controllers: [EvaluatorController],
  providers: [EvaluatorService],
})
export class EvaluatorModule {}
