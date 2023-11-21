import { Test, TestingModule } from '@nestjs/testing';
import { DeckService } from './deck.service';
import { getModelToken } from '@nestjs/mongoose';
import { Deck } from '../../entity/deck.entity';
import { Model } from 'mongoose';

const DECK: any = {
  drawnPile: [],
  drawPile: [
    'AS',
    '2S',
    '3S',
    '4S',
    '5S',
    '6S',
    '7S',
    '8S',
    '9S',
    '10S',
    'JS',
    'QS',
    'KS',
    'AD',
    '2D',
    '3D',
    '4D',
    '5D',
    '6D',
    '7D',
    '8D',
    '9D',
    '10D',
    'JD',
    'QD',
    'KD',
    'AC',
    '2C',
    '3C',
    '4C',
    '5C',
    '6C',
    '7C',
    '8C',
    '9C',
    '10C',
    'JC',
    'QC',
    'KC',
    'AH',
    '2H',
    '3H',
    '4H',
    '5H',
    '6H',
    '7H',
    '8H',
    '9H',
    '10H',
    'JH',
    'QH',
    'KH',
  ],
  remaining: 52,
  _id: '655cd0d1a9b29f3a3136177e',
  __v: 0,
};

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
        remaining: DECK.drawPile.length,
      });
    });
    it('should create cards, shuffled', () => {
      jest.spyOn(deckModel, 'create').mockResolvedValue(DECK);
      expect(service.create({ isShuffled: true })).resolves.toStrictEqual(DECK);
    });
  });
});
