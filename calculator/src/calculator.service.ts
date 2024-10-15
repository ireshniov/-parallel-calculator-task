import { Inject, Injectable } from '@nestjs/common';
import { CalculatorEvaluateResponseDto } from './dto/calculator-evaluate-response.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CalculatorService {
  constructor(
    @Inject('EVALUATOR_SERVICE') private readonly client: ClientProxy,
  ) {}

  async evaluateExpression(
    expression: string,
  ): Promise<CalculatorEvaluateResponseDto> {
    const expressionWithoutParentheses =
      await this.solveInnerParentheses(expression);

    const evaluatedExpressions = await this.evaluateExpressions(
      expressionWithoutParentheses,
    );

    const finalExpression: string = evaluatedExpressions.join('');
    const result: string = await lastValueFrom(
      this.client.send<string>({ cmd: 'evaluate' }, finalExpression),
    );

    return plainToInstance(CalculatorEvaluateResponseDto, { result });
  }

  private async solveInnerParentheses(expression: string) {
    let resultExpression: string = expression;

    const parenthesesRegex = /\([^()]+\)/;

    while (parenthesesRegex.test(resultExpression)) {
      const matchResult = resultExpression.match(parenthesesRegex);

      if (!matchResult) {
        continue;
      }

      const subExpression = matchResult[0];

      const result = await lastValueFrom(
        this.client.send<string>(
          { cmd: 'evaluate' },
          subExpression.slice(1, -1),
        ),
      );

      resultExpression = resultExpression.replace(subExpression, result);
    }

    return resultExpression;
  }

  private async evaluateExpressions(expression: string): Promise<string[]> {
    const operators = /([+\-*\/])/;
    const splitExpression = expression.split(operators);

    return await Promise.all(
      splitExpression.map((part) => {
        if (operators.test(part)) {
          return part;
        }

        return lastValueFrom(
          this.client.send<string>({ cmd: 'evaluate' }, part),
        );
      }),
    );
  }
}
