export class DeckMetadataDTO {
  /**
   * @example true
   */
  success: boolean;
  /**
   * Alphanumeric deck id.
   * @example 655eff90af0b9322c12aa6f3
   */
  deckId: string;
  /**
   * Remaining number of cards in the draw pile.
   * @example 52
   */
  remaining: number;
}
