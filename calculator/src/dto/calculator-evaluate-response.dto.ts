import { IsNumber } from 'class-validator';

export class CalculatorEvaluateResponseDto {
  @IsNumber()
  result: number;
}
