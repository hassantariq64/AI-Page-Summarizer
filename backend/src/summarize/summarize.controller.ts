import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SummarizeService } from './summarize.service';
import { SummarizeRequestDto } from './dto/summarize-request.dto';

@Controller()
export class SummarizeController {
  constructor(private readonly summarizeService: SummarizeService) {}

  @Post('summarize')
  @HttpCode(HttpStatus.OK)
  async summarize(@Body() dto: SummarizeRequestDto) {
    const summary = await this.summarizeService.summarize(dto.content);
    return { summary };
  }
}
