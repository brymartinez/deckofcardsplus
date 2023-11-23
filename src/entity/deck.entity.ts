import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeckDocument = HydratedDocument<Deck>;

@Schema()
export class Deck {
  /**
   * Alphanumeric deck id.
   * @example 655eff90af0b9322c12aa6f3
   */
  @Prop()
  id: string;
  /**
   * Cards that are already drawn from the deck.
   * @example "['AS','2S']"
   */
  @Prop([String])
  drawnPile: string[];
  /**
   * Cards that are yet to be drawn. First = top card
   * @example ['AS','2S']
   */
  @Prop([String])
  drawPile: string[];
  /**
   * Determine if the requested deck is shuffled.
   * @example true
   */
  @Prop()
  isShuffled: boolean;
  /**
   * Remaining number of cards in the draw pile.
   * @example 52
   */
  @Prop()
  remaining: number;
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
