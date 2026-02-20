import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class SummarizeRequestDto {
  @IsString({ message: 'content must be a string' })
  @IsNotEmpty({ message: 'content should not be empty' })
  @MaxLength(12000, {
    message: 'Content must not exceed 12000 characters',
  })
  content: string;
}
