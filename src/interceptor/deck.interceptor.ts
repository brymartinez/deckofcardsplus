import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { DeckDTO } from 'src/dto/deck.dto';
import { DeckDocument } from 'src/entity/deck.entity';

@Injectable()
export class DeckInterceptor<T> implements NestInterceptor<T, DeckDTO> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<DeckDTO> {
    const request = context.switchToHttp().getRequest();

    Logger.log(request.headers, 'Headers');

    Logger.log(request.body, 'Body');

    Logger.log(request.params, 'Params');

    Logger.log(request.query, 'Query');

    return next.handle().pipe(
      map((response: DeckDocument) => ({
        success: true,
        deckId: response._id.toString(),
        shuffled: response.isShuffled,
        remaining: response.remaining,
      })),
    );
  }
}
