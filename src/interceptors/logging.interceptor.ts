import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<undefined> {
    console.info('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.info(`After... ${Date.now() - now}ms`)));
  }
}
