import { HttpException, HttpStatus } from '@nestjs/common';
import { APIError } from './api-error';

export class DeckNotFoundException extends HttpException {
  constructor() {
    const error: APIError = {
      code: '1001',
      message: 'Deck not found',
    };
    super(error, HttpStatus.BAD_REQUEST);
  }
}
