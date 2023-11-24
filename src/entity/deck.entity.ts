import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeckDocument = HydratedDocument<Deck>;

@Schema()
export class Deck {
  @Prop()
  id: string;

  @Prop([String])
  drawnPile: string[];

  @Prop([String])
  drawPile: string[];

  @Prop()
  isShuffled: boolean;

  @Prop()
  remaining: number;
}

export const DeckSchema = SchemaFactory.createForClass(Deck);
