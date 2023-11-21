import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeckDTO } from '../../dto/create-deck.dto';
import { Deck } from '../../entity/deck.entity';
import { DeckSuit } from '../../enums/enums';
import { CardDTO } from 'src/dto/card.dto';

const DECK_OF_CARDS = [
  { key: 'A', value: 'ACE' },
  { key: '2', value: '2' },
  { key: '3', value: '3' },
  { key: '4', value: '4' },
  { key: '5', value: '5' },
  { key: '6', value: '6' },
  { key: '7', value: '7' },
  { key: '8', value: '8' },
  { key: '9', value: '9' },
  { key: '10', value: '10' },
  { key: 'J', value: 'JACK' },
  { key: 'Q', value: 'QUEEN' },
  { key: 'K', value: 'KING' },
];
// Should not be an object as it does not retain ordering

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

  public async draw(deckId: string, count: number) {
    const deck = await this.get(deckId);
    const cards: CardDTO[] = [];
    for (let i = 0; i < count; i++) {
      const topCard = deck.drawPile.shift();

      const codeSplit = topCard.split('');
      const codeKey = codeSplit.slice(0, codeSplit.length - 1).join('');
      cards.push({
        code: topCard,
        value: DECK_OF_CARDS.find((card) => card.key === codeKey).value,
        suit: DeckSuit[codeSplit[codeSplit.length - 1]],
      });

      deck.drawnPile.push(topCard);
      deck.remaining--;
    }

    await deck.save();

    return cards;
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
      DECK_OF_CARDS.forEach((card) => {
        result.push(card.key + suit);
      });
    });

    if (isShuffled) {
      return this.shuffle(result);
    }

    return result;
  }
}
