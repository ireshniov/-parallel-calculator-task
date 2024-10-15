import { IsString } from 'class-validator';

export class CalculatorEvaluateRequestDto {
  @IsString()
  expression: string;
}
