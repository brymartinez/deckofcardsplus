import { DeckMetadataDTO } from 'src/dto/deck-metadata.dto';

export class Card {
  /**
   * Value + Suit of the card.
   * @example AS
   */
  code: string;
  /**
   * Value of the card.
   * @example ACE
   */
  value: string;
  /**
   * Suit of the card.
   * @example SPADES
   */
  suit: string;
}

export class CardDTO extends DeckMetadataDTO {
  cards: Card[];
}
