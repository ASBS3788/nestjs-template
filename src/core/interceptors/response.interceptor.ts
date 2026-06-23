import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ApiResponse } from '@core/types/api-response'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
        const response = context.switchToHttp().getResponse<Response>()

        return next.handle().pipe(
            map((data) => ({
                statusCode: response.statusCode,
                timestamp: new Date().toISOString(),
                data,
            })),
        )
    }
}
