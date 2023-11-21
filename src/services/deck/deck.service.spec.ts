import { Test, TestingModule } from '@nestjs/testing';
import { DeckService } from './deck.service';
import { getModelToken } from '@nestjs/mongoose';
import { Deck } from '../../entity/deck.entity';
import { Model } from 'mongoose';
import { DECK } from 'src/constants/test-constants';

describe('DeckService', () => {
  let service: DeckService;
  let deckModel: Model<Deck>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeckService,
        {
          provide: getModelToken('Deck'),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    deckModel = module.get<Model<Deck>>(getModelToken('Deck'));
    service = module.get<DeckService>(DeckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create cards', () => {
      jest.spyOn(deckModel, 'create').mockResolvedValue(DECK);
      expect(service.create({ isShuffled: false })).resolves.toStrictEqual(
        DECK,
      );

      expect(deckModel.create).toHaveBeenCalledWith({
        drawPile: DECK.drawPile,
        drawnPile: [],
        isShuffled: false,
        remaining: DECK.drawPile.length,
      });
    });
    it('should create cards, shuffled', () => {
      jest.spyOn(deckModel, 'create').mockResolvedValue(DECK);
      expect(service.create({ isShuffled: true })).resolves.toStrictEqual(DECK);
    });
  });
  describe('get', () => {
    it('should get cards', () => {
      jest.spyOn(deckModel, 'findById').mockResolvedValue(DECK);

      expect(service.get('deckId')).resolves.toStrictEqual(DECK);
    });
  });
});
