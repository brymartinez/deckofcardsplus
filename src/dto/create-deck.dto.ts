import { IsOptional, IsBoolean } from 'class-validator';

export class CreateDeckDTO {
  /**
   * Determine if the deck is shuffled on creation.
   * Otherwise, will follow the order: SPADES, DIAMONDS, CLUBS, HEARTS
   * @example true
   */
  @IsOptional()
  @IsBoolean()
  isShuffled: boolean = true;
}
