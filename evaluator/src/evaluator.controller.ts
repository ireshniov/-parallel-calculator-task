import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EvaluatorService } from './evaluator.service';

@Controller()
export class EvaluatorController {
  constructor(private readonly evaluatorService: EvaluatorService) {}

  @MessagePattern({ cmd: 'evaluate' })
  evaluate(expression: string): string {
    return this.evaluatorService.evaluate(expression);
  }
}
