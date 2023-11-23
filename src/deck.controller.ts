import {
  Body,
  Controller,
  Logger,
  Post,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { DeckService } from './services/deck/deck.service';
import { CreateDeckDTO } from './dto/create-deck.dto';
import { DeckInterceptor } from './interceptor/deck.interceptor';
import { CardInterceptor } from './interceptor/card.interceptor';

@Controller({ version: '1', path: 'deck' })
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  @UseInterceptors(DeckInterceptor)
  public async createDeck(@Body() dto?: CreateDeckDTO) {
    Logger.debug({ msg: 'DeckController', dto });
    return this.deckService.create(dto);
  }

  @Get(':deckId')
  @UseInterceptors(DeckInterceptor)
  public async getDeck(@Param('deckId') deckId: string) {
    return this.deckService.get(deckId);
  }

  @Post(':deckId/draw/:count')
  @UseInterceptors(CardInterceptor)
  public async drawFromDeck(
    @Param('deckId') deckId: string,
    @Param('count') count: number,
  ) {
    return this.deckService.draw(deckId, count);
  }
}
