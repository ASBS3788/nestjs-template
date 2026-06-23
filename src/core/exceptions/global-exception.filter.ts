import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Response, Request } from 'express'
import { NO_STACK_TRACE_AVAILABLE } from '@core/const/messages'
import { ExceptionToMessagesMapper } from './exception-to-messages.mapper'
import { ApiExceptionResponse } from '@core/types/api-response'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name)

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        const message = ExceptionToMessagesMapper.parse(exception)

        this.logger.error(
            `[${request.method}] ${request.path} - ${status}: ${message.join(', ')}`,
            exception instanceof Error ? exception.stack : NO_STACK_TRACE_AVAILABLE,
        )

        const errorResponse: ApiExceptionResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            error: message,
        }

        response.status(status).json(errorResponse)
    }
}
