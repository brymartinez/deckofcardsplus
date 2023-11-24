import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class ShuffleDeckQueryDTO {
  /**
   * Determine if the remaining (drawn) cards will be shuffled with the rest of the deck.
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @ApiPropertyOptional()
  remaining: boolean = false;
}
