import { first, lastValueFrom, of } from 'rxjs';
import { DeckInterceptor } from './deck.interceptor';
import { DECK } from 'src/constants/test-constants';

const CONTEXT: any = {
  switchToHttp: () => ({
    getRequest: () => ({
      headers: {},
      body: {},
      params: {},
      query: {},
    }),
  }),
};

const NEXT: any = {
  handle: () => {
    return of(DECK);
  },
};

describe('DeckInterceptor', () => {
  const interceptor = new DeckInterceptor();
  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
  it('should return deck DTO', async () => {
    await expect(
      lastValueFrom(interceptor.intercept(CONTEXT, NEXT).pipe(first())),
    ).resolves.toEqual({
      deckId: '655cd0d1a9b29f3a3136177e',
      remaining: 52,
      isShuffled: true,
      success: true,
    });
  });
  //   it('should return if deck is not a DeckDocument', async () => {
  //     await expect(
  //       lastValueFrom(interceptor.intercept(CONTEXT, {
  //   handle: () => {
  //     return of(DECK);
  //   },
  // }).pipe(first())),
  //     ).resolves.toEqual({
  //       deckId: '655cd0d1a9b29f3a3136177e',
  //       remaining: 52,
  //       isShuffled: true,
  //       success: true,
  //     });
  //   });
});
