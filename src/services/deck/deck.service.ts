import { Injectable, Logger } from '@nestjs/common';
import { CreateDeckDTO } from 'src/dto/create-deck.dto';

@Injectable()
export class DeckService {
  constructor() {}

  create(dto: CreateDeckDTO) {
    Logger.debug({ msg: 'DeckService', dto });

    return;
  }
}
