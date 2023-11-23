import { Card } from 'src/models/card';
import { DeckMetadata } from './deck.dto';

export class CardDTO extends DeckMetadata {
  cards: Card[];
}
