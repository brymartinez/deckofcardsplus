import { HttpException, HttpStatus } from '@nestjs/common';
import { APIError } from './api-error';

export class ValidationException extends HttpException {
  constructor(message: string) {
    const error: APIError = {
      code: '1000',
      message,
    };
    super(error, HttpStatus.BAD_REQUEST);
  }
}
