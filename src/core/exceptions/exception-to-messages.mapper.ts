import { HttpException } from '@nestjs/common'
import { DEFAULT_MESSAGE, UNEXPECTED_ERROR_STRUCTURE } from '@core/const/messages'

const isStringArray = (value: unknown): value is string[] => {
    return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

const parse = (exception: unknown): string[] => {
    if (exception instanceof Error) {
        return [exception.message]
    }

    if (exception instanceof HttpException) {
        const response = exception.getResponse()

        if (typeof response === 'string') {
            return [response]
        }

        if (typeof response === 'object' && response !== null) {
            const obj = response as Record<string, unknown>
            const message = obj.message

            if (isStringArray(message)) {
                return message
            }

            if (typeof message === 'string') {
                return [message]
            }
        }

        return [UNEXPECTED_ERROR_STRUCTURE]
    }

    return [DEFAULT_MESSAGE]
}

export const ExceptionToMessagesMapper = { parse } as const
