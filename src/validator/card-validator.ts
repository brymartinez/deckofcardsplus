import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DECK_OF_CARDS } from 'src/constants/constants';
import { DeckSuit } from 'src/enums/enums';

@ValidatorConstraint({ name: 'card', async: false })
export class CardValidator implements ValidatorConstraintInterface {
  private deckValues: string[];
  constructor() {
    this.deckValues = DECK_OF_CARDS.map((value) => value.key);
  }
  validate(text: string) {
    if (typeof text !== 'string') return false;

    const splitText = text.split('');
    const suit = splitText[text.length - 1];

    if (!DeckSuit[suit]) {
      return false;
    }

    return this.deckValues.includes(
      splitText.slice(0, text.length - 1).join(''),
    );
  }
}
