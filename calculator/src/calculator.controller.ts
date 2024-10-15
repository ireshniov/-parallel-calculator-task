import { Body, Controller, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorEvaluateResponseDto } from './dto/calculator-evaluate-response.dto';
import { CalculatorEvaluateRequestDto } from './dto/calculator-evaluate-request.dto';

@Controller('evaluate')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  async evaluate(
    @Body() dto: CalculatorEvaluateRequestDto,
  ): Promise<CalculatorEvaluateResponseDto> {
    return this.calculatorService.evaluateExpression(dto.expression);
  }
}
