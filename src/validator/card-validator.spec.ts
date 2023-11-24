import { CardValidator } from './card-validator';

describe('CardValidator', () => {
  const validator = new CardValidator();
  it('should be defined', () => {
    expect(validator).toBeDefined();
  });
  it('should validate', () => {
    expect(validator.validate('3S')).toStrictEqual(true);
    expect(validator.validate('3B')).toStrictEqual(false);
    expect(validator.validate('XS')).toStrictEqual(false);
    expect(validator.validate('not a proper card.')).toStrictEqual(false);
    expect(validator.validate(2 as any)).toStrictEqual(false);
  });
});
