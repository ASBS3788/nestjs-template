import { INestApplication } from '@nestjs/common'
import { GlobalExceptionFilter } from '../core/filters/global-exception.filter'

export function setupGlobalExceptionFilter(app: INestApplication) {
    app.useGlobalFilters(app.get(GlobalExceptionFilter))
}
