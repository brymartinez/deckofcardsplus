import { HttpException, HttpStatus } from '@nestjs/common';
import { APIError } from './api-error';

export class DeckNotFoundException extends HttpException {
  constructor(message: string) {
    const error: APIError = {
      code: '1001',
      message,
    };
    super(error, HttpStatus.BAD_REQUEST);
  }
}
