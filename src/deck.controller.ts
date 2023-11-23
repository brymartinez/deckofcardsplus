import {
  Body,
  Controller,
  Logger,
  Post,
  Get,
  Param,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { DeckService } from './services/deck/deck.service';
import { CreateDeckDTO } from './dto/create-deck.dto';
import { DeckInterceptor } from './interceptor/deck.interceptor';
import { CardInterceptor } from './interceptor/card.interceptor';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { CardDTO } from './dto/card.dto';
import { DeckDTO } from './dto/deck.dto';

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
  @ApiExtraModels(DeckDTO)
  @ApiResponse({
    description: 'Deck details',
    status: 200,
    schema: {
      $ref: getSchemaPath(DeckDTO),
    },
  })
  public async getDeck(@Param('deckId') deckId: string) {
    return this.deckService.get(deckId);
  }

  @HttpCode(200)
  @Post(':deckId/draw/:count')
  @ApiExtraModels(CardDTO)
  @ApiResponse({
    description: 'Deck details plus cards drawn',
    status: 200,
    schema: {
      $ref: getSchemaPath(CardDTO),
    },
  })
  @UseInterceptors(CardInterceptor)
  public async drawFromDeck(
    @Param('deckId') deckId: string,
    @Param('count') count: number,
  ) {
    return this.deckService.draw(deckId, count);
  }
}
