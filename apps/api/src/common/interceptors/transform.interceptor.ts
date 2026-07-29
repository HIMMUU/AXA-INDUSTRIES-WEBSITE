import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '@axa/types';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        // Handle custom formatted responses
        if (data && typeof data === 'object' && 'success' in data && 'message' in data) {
          return data;
        }

        return {
          success: true,
          message: 'Operation completed successfully',
          data: data !== undefined ? data : null,
          timestamp: new Date().toISOString()
        };
      })
    );
  }
}
