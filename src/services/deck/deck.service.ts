import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeckDTO } from '../../dto/create-deck.dto';
import { Deck } from '../../entity/deck.entity';
import { DeckSuit } from '../../enums/enums';
import { Card } from 'src/dto/card.dto';
import { DECK_OF_CARDS } from 'src/constants/constants';

@Injectable()
export class DeckService {
  constructor(@InjectModel(Deck.name) private deckModel: Model<Deck>) {}

  public async create(dto: CreateDeckDTO): Promise<Deck> {
    Logger.debug({ msg: 'DeckService', dto });
    const drawPile = this.createCards(dto);
    const createdDeck = await this.deckModel.create({
      drawPile,
      drawnPile: [],
      isShuffled: dto.isShuffled,
      remaining: drawPile.length,
    });

    return createdDeck;
  }

  public async get(deckId: string) {
    const deck = await this.deckModel.findById(deckId).lean();
    Logger.debug({ msg: 'DeckService', deck });
    return deck;
  }

  public async draw(deckId: string, count: number): Promise<[Card[], Deck]> {
    const deck = await this.deckModel.findById(deckId);
    const cards: Card[] = [];
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

    return [cards, deck.toObject()];
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

  public async save(deck: Partial<Deck>) {
    return this.deckModel.updateOne({ _id: deck.id }, deck);
  }

  private createCards(dto: CreateDeckDTO): string[] {
    let result: string[] = [];

    if (!dto.cards?.length) {
      Object.keys(DeckSuit).forEach((suit) => {
        DECK_OF_CARDS.forEach((card) => {
          result.push(card.key + suit);
        });
      });
    } else {
      result = [...dto.cards];
    }

    if (dto.isShuffled) {
      return this.shuffle(result);
    }

    return result;
  }
}
