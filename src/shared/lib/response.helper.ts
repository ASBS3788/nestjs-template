import { HttpStatus, Injectable } from '@nestjs/common'

type ApiResponse<T = unknown> = {
    statusCode: number
    timestamp: string
    data?: T
    message?: string[]
    error?: string[]
    warning?: string[]
}

@Injectable()
export class ResponseHelper {
    success<T>(data: T, message?: string | string[]): ApiResponse<T> {
        const response: ApiResponse<T> = {
            statusCode: HttpStatus.OK,
            timestamp: new Date().toISOString(),
            data,
        }

        if (message) {
            response.message = Array.isArray(message) ? message : [message]
        }

        return response
    }

    error(error: string | string[], statusCode: number): ApiResponse {
        return {
            statusCode,
            timestamp: new Date().toISOString(),
            error: Array.isArray(error) ? error : [error],
        }
    }

    warning(message: string | string[]): ApiResponse {
        return {
            statusCode: HttpStatus.OK,
            timestamp: new Date().toISOString(),
            warning: Array.isArray(message) ? message : [message],
        }
    }
}
