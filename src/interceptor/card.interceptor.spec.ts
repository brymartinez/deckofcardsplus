import { first, lastValueFrom, of } from 'rxjs';
import { CARDS, DECK } from 'src/constants/test-constants';
import { CardInterceptor } from './card.interceptor';

const CONTEXT: any = {
  switchToHttp: () => ({
    getRequest: () => ({
      headers: {},
      body: {},
      params: {
        deckId: '655cd0d1a9b29f3a3136177e',
      },
      query: {},
    }),
  }),
};

const NEXT: any = {
  handle: () => {
    return of([CARDS, DECK]);
  },
};

describe('CardInterceptor', () => {
  const interceptor = new CardInterceptor();
  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
  it('should return card DTO', async () => {
    await expect(
      lastValueFrom(interceptor.intercept(CONTEXT, NEXT).pipe(first())),
    ).resolves.toEqual({
      success: true,
      deckId: '655cd0d1a9b29f3a3136177e',
      cards: CARDS,
      remaining: 52,
    });
  });
});
