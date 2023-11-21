import { Test, TestingModule } from '@nestjs/testing';
import { DeckController } from './deck.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let deckController: DeckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeckController],
      providers: [AppService],
    }).compile();

    deckController = app.get<DeckController>(DeckController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(deckController.getHello()).toBe('Hello World!');
    });
  });
});
