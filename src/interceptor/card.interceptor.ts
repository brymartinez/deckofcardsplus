import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Card, CardDTO } from 'src/dto/card.dto';
import { Deck } from 'src/entity/deck.entity';

@Injectable()
export class CardInterceptor<T> implements NestInterceptor<T, CardDTO> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<CardDTO> {
    const request = context.switchToHttp().getRequest();

    Logger.log(request.headers, 'Headers');

    Logger.log(request.body, 'Body');

    Logger.log(request.params, 'Params');

    Logger.log(request.query, 'Query');

    return next.handle().pipe(
      map((response: [Card[], Deck]) => ({
        success: true,
        deckId: request.params.deckId,
        cards: response[0],
        remaining: response[1].remaining,
      })),
    );
  }
}
