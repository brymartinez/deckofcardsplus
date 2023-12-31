import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  HttpCode,
  Put,
  Query,
  // Logger,
} from '@nestjs/common';
import { DeckService } from './services/deck/deck.service';
import { CreateDeckDTO } from './dto/create-deck.dto';
import { DeckInterceptor } from './interceptor/deck.interceptor';
import { CardInterceptor } from './interceptor/card.interceptor';
import { ShuffleDeckQueryDTO } from './dto/shuffle-deck-query.dto';
import { DeckPipe } from './pipes/deck/deck.pipe';
import { Deck } from './entity/deck.entity';

@Controller({ version: '1', path: 'deck' })
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  @UseInterceptors(DeckInterceptor)
  public async createDeck(@Body() dto?: CreateDeckDTO) {
    return this.deckService.create(dto);
  }

  @Get(':id')
  @UseInterceptors(DeckInterceptor)
  public async getDeck(@Param('id', DeckPipe) deck: Deck) {
    return deck;
  }

  @HttpCode(200)
  @Post(':id/draw/:count')
  @UseInterceptors(CardInterceptor)
  public async drawFromDeck(
    @Param('id', DeckPipe) deckId: string,
    @Param('count') count: number,
  ) {
    return this.deckService.draw(deckId, count);
  }

  @Put(':id/shuffle')
  @UseInterceptors(DeckInterceptor)
  public async shuffleDeck(
    @Param('id', DeckPipe) deckId: string,
    @Query() params?: ShuffleDeckQueryDTO,
  ) {
    const deck = await this.deckService.get(deckId);
    const shuffleRemaining = params?.remaining;
    let remaining = deck.remaining;
    let totalDeck = deck.drawPile;

    if (shuffleRemaining) {
      totalDeck = [...totalDeck, ...deck.drawnPile];

      remaining = totalDeck.length;
    }

    totalDeck = [...this.deckService.shuffle(totalDeck)];

    await this.deckService.save({
      id: deckId,
      drawPile: totalDeck,
      ...(shuffleRemaining && { drawnPile: [] }),
      remaining,
    });

    return {
      ...deck,
      remaining,
    };
  }
}
