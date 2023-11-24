import { Test, TestingModule } from '@nestjs/testing';
import { DeckController } from './deck.controller';
import { DeckService } from './services/deck/deck.service';
import { DECK } from './constants/test-constants';

describe('DeckController', () => {
  let deckController: DeckController;
  let deckService: DeckService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeckController],
      providers: [
        {
          provide: DeckService,
          useValue: {
            create: jest.fn(),
            get: jest.fn().mockResolvedValue(DECK),
            draw: jest.fn(),
            save: jest.fn(),
            shuffle: jest.fn().mockReturnValue(DECK.drawPile),
          },
        },
      ],
    }).compile();

    deckService = app.get<DeckService>(DeckService);
    deckController = app.get<DeckController>(DeckController);
  });

  describe('create', () => {
    it('should create', () => {
      expect(deckController.createDeck()).resolves.not.toThrow();
    });
  });
  describe('get', () => {
    it('should get', () => {
      expect(deckController.getDeck('deckId')).resolves.not.toThrow();
    });
  });
  describe('draw', () => {
    it('should draw', () => {
      expect(deckController.drawFromDeck('deckId', 1)).resolves.not.toThrow();
    });
  });
  describe('shuffle', () => {
    it('should shuffle not including remaining', () => {
      jest.spyOn(deckService, 'get').mockResolvedValue(DECK);
      expect(deckController.shuffleDeck('deckId')).resolves.not.toThrow();
    });
    it('should shuffle including remaining', () => {
      jest.spyOn(deckService, 'get').mockResolvedValue(DECK);
      expect(
        deckController.shuffleDeck('deckId', { remaining: true }),
      ).resolves.not.toThrow();
    });
  });
});
