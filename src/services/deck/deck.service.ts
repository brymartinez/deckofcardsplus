import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeckDTO } from 'src/dto/create-deck.dto';
import { Deck } from 'src/entity/deck.entity';

@Injectable()
export class DeckService {
  constructor(@InjectModel(Deck.name) private deckModel: Model<Deck>) {}

  create(dto: CreateDeckDTO) {
    Logger.debug({ msg: 'DeckService', dto });
    // const createdDeck = new this.deckModel();
    return;
  }
}
