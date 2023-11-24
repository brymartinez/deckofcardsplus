import { CardValidator } from './card-validator';

describe('CardValidator', () => {
  const validator = new CardValidator();
  it('should be defined', () => {
    expect(validator).toBeDefined();
  });
});
