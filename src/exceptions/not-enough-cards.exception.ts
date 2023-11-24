import { HttpException, HttpStatus } from '@nestjs/common';
import { APIError } from './api-error';

export class NotEnoughCardsException extends HttpException {
  constructor(count: number, left: number) {
    const error: APIError = {
      code: '1002',
      message: `Not enough cards. Requested ${count}, has ${left}`,
    };
    super(error, HttpStatus.BAD_REQUEST);
  }
}
