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
            create: jest.fn().mockResolvedValue(DECK),
            findById: jest.fn().mockImplementation(() => ({
              lean: jest.fn().mockResolvedValue(DECK),
            })),
            updateOne: jest.fn(),
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
      expect(
        service.create({ isShuffled: true, cards: [] }),
      ).resolves.toStrictEqual(DECK);
    });
    it('should create cards, partial deck', () => {
      const expected = {
        ...DECK,
        isShuffled: false,
        drawPile: ['AS', 'AH'],
        remaining: 2,
      };
      jest.spyOn(deckModel, 'create').mockResolvedValue(expected);
      expect(service.create({ cards: ['AS', 'AH'] })).resolves.toStrictEqual(
        expected,
      );
      expect(deckModel.create).toHaveBeenCalledWith({
        drawPile: ['AS', 'AH'],
        drawnPile: [],
        isShuffled: false,
        remaining: 2,
      });
    });
  });
  describe('get', () => {
    it('should get cards', () => {
      expect(service.get('deckId')).resolves.toStrictEqual(DECK);
    });
  });
  describe('draw', () => {
    it('should draw cards', () => {
      jest.spyOn(deckModel, 'findById').mockResolvedValue({
        ...DECK,
        save: jest.fn(),
        toObject: jest.fn().mockReturnValue(DECK),
      });
      expect(service.draw('deckId', 1)).resolves.toStrictEqual([
        [{ code: 'AS', suit: 'SPADES', value: 'ACE' }],
        DECK,
      ]);
    });
  });
  describe('save', () => {
    it('should save deck', () => {
      expect(
        service.save({
          id: 'deckId',
        }),
      ).resolves.not.toThrow();
    });
  });
});
