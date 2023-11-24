import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsArray, Validate } from 'class-validator';
import { CardValidator } from 'src/validator/card-validator';

export class CreateDeckDTO {
  /**
   * Determine if the deck is shuffled on creation.
   * Otherwise, will follow the order: SPADES, DIAMONDS, CLUBS, HEARTS
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  isShuffled?: boolean = true;
  /**
   * Partial deck. Passing an empty array creates a full deck.
   * @example ['AS', 'AD', 'AC', 'AH']
   */
  @IsOptional()
  @IsArray()
  @Validate(CardValidator, {
    each: true,
    message: "cards must be a valid card format. e.g. 'AS' for ACE of SPADES",
  })
  @ApiPropertyOptional()
  cards?: string[];
}
