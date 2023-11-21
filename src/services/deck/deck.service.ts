import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeckDTO } from '../../dto/create-deck.dto';
import { Deck } from '../../entity/deck.entity';
import { DeckSuit } from '../../enums/enums';

const DECK_CARDS = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

@Injectable()
export class DeckService {
  constructor(@InjectModel(Deck.name) private deckModel: Model<Deck>) {}

  public async create(dto: CreateDeckDTO): Promise<Deck> {
    Logger.debug({ msg: 'DeckService', dto });
    const drawPile = this.createCards(dto.isShuffled);
    const createdDeck = await this.deckModel.create({
      drawPile,
      drawnPile: [],
      isShuffled: dto.isShuffled,
      remaining: drawPile.length,
    });

    return createdDeck;
  }

  public async get(deckId: string) {
    return this.deckModel.findById(deckId);
  }

  public shuffle(cards: string[]): string[] {
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (let i = cards.length - 1; i != 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cards[j];
      cards[j] = cards[i];
      cards[i] = temp;
    }

    return cards;
  }

  private createCards(isShuffled: boolean): string[] {
    const result: string[] = [];
    Object.keys(DeckSuit).forEach((suit) => {
      DECK_CARDS.forEach((card) => {
        result.push(card + suit);
      });
    });

    if (isShuffled) {
      return this.shuffle(result);
    }

    return result;
  }
}
