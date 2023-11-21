import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DeckService {
  constructor() {}

  create(count = 1) {
    Logger.debug(count);
    return;
  }
}
