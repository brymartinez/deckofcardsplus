import { Card } from 'src/models/card';
import { DeckMetadata } from 'src/models/deck.metadata';

export class CardDTO extends DeckMetadata {
  cards: Card[];
}
