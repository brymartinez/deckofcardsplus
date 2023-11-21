import { Test, TestingModule } from '@nestjs/testing';
import { DeckController } from './deck.controller';
import { DeckService } from './services/deck/deck.service';

describe('AppController', () => {
  let deckController: DeckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeckController],
      providers: [DeckService],
    }).compile();

    deckController = app.get<DeckController>(DeckController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(deckController.createDeck()).toBeDefined();
    });
  });
});
