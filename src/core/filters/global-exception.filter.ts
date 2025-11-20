import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { Response, Request } from 'express'
import { ExceptionParserService } from '../services/exception-parser.service'
import { ResponseHelper } from 'src/shared/lib/response.helper'
import { NO_STACK_TRACE_AVAILABLE } from '../const/messages'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name)

    constructor(
        private readonly exceptionParserService: ExceptionParserService,
        private readonly responseHelper: ResponseHelper
    ) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const message = this.exceptionParserService.parse(exception)

        const bodyResponse = this.responseHelper.error(message, status)

        this.logger.error(
            `[${request.method}] ${request.path} - ${status}: ${message.join(', ')}`,
            exception instanceof Error ? exception.stack : NO_STACK_TRACE_AVAILABLE
        )

        response.status(status).json({
            ...bodyResponse,
            path: request.url,
            method: request.method,
        })
    }
}
