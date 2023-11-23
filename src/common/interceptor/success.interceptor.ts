import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Response } from 'express';
import { Observable, map } from 'rxjs';

import { IResponseEntity } from '../interface';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse<Response>();
    const status: number = response.statusCode;

    return next.handle().pipe(
      map(
        (data): IResponseEntity => ({
          success: true,
          statusCode: status,
          data,
        }),
      ),
    );
  }
}
