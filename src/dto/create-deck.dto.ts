import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateDeckDTO {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(6)
  count: number;
}
