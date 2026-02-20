import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SummarizeController } from './summarize/summarize.controller';
import { SummarizeService } from './summarize/summarize.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [SummarizeController],
  providers: [SummarizeService],
})
export class AppModule {}
