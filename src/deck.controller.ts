import { Body, Controller, Logger, Post } from '@nestjs/common';
import { DeckService } from './services/deck/deck.service';
import { CreateDeckDTO } from './dto/create-deck.dto';

@Controller({ version: '1', path: 'deck' })
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  createDeck(@Body() dto?: CreateDeckDTO) {
    Logger.debug({ msg: 'DeckController', dto });
    return this.deckService.create(dto);
  }
}
