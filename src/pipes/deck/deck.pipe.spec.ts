import { DeckNotFoundException } from 'src/exceptions/deck-not-found.exception';
import { DeckPipe } from './deck.pipe';

describe('DeckPipe', () => {
  const mockedModel: any = {
    findById: jest.fn().mockImplementation((arg) => ({
      lean: jest.fn().mockImplementation(() => {
        if (arg === 'id') return {};
      }),
    })),
  };
  it('should be defined', () => {
    expect(new DeckPipe(mockedModel)).toBeDefined();
  });
  it('should not throw', async () => {
    await expect(
      new DeckPipe(mockedModel).transform('id', undefined),
    ).resolves.toStrictEqual({});
  });
  it('should throw on find error', async () => {
    await expect(
      new DeckPipe(mockedModel).transform('non-id', undefined),
    ).rejects.toThrow(DeckNotFoundException);
  });
});
