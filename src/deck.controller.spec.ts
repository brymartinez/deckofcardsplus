import { Test, TestingModule } from '@nestjs/testing';
import { DeckController } from './deck.controller';
import { DeckService } from './services/deck/deck.service';

describe('DeckController', () => {
  let deckController: DeckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeckController],
      providers: [
        {
          provide: DeckService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    deckController = app.get<DeckController>(DeckController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(deckController.createDeck()).resolves.not.toThrow();
    });
  });
});
