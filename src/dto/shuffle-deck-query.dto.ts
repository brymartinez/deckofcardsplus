import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class ShuffleDeckQueryDTO {
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  remaining: boolean = false;
}
