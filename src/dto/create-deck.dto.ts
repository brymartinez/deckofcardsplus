import { IsNumber, IsOptional, Min, Max, IsBoolean } from 'class-validator';

export class CreateDeckDTO {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(6)
  count: number = 1;
  @IsOptional()
  @IsBoolean()
  isShuffled: boolean = true;
}
