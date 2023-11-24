import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Model } from 'mongoose';
import { Deck } from 'src/entity/deck.entity';
import { InjectModel } from '@nestjs/mongoose';
import { DeckNotFoundException } from 'src/exceptions/deck-not-found.exception';

@Injectable()
export class DeckPipe implements PipeTransform {
  constructor(@InjectModel(Deck.name) private deckModel: Model<Deck>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: any, _metadata: ArgumentMetadata): Promise<Deck> {
    const result = await this.deckModel.findById(value).lean();

    if (!result) {
      throw new DeckNotFoundException();
    }

    return result;
  }
}
