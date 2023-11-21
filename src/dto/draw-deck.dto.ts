import { IsOptional, IsNumber, Min } from 'class-validator';

export class DrawDeckDTO {
  @IsOptional()
  @IsNumber()
  @Min(1)
  count: number = 1;
}
