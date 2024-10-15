import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluatorService {
  evaluate(expression: string): string {
    // todo use another way to execute
    return eval(expression);
  }
}
