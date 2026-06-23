export type ApiResponseBaseType = {
    statusCode: number
    timestamp: string
}

export type ApiSuccessResponse<T> = ApiResponseBaseType & {
    data: T
}

export type ApiExceptionResponse = ApiResponseBaseType & {
    error: string[]
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiExceptionResponse
