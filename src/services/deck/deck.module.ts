import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Deck, DeckSchema } from '../../entity/deck.entity';
import { DeckService } from './deck.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
  ],
  providers: [DeckService],
  exports: [DeckService],
})
export class DeckModule {}
