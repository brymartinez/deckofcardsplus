import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class ShuffleDeckQueryDTO {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  remaining: boolean = false;
}
