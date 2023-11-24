import { DeckMetadataDTO } from 'src/dto/deck-metadata.dto';

export class Card {
  code: string;
  value: string;
  suit: string;
}

export class CardDTO extends DeckMetadataDTO {
  cards: Card[];
}
