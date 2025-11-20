import { INestApplication } from '@nestjs/common'
import { json, urlencoded } from 'express'

const DEFAULT_LIMIT = `1mb`

export function setupPayload(app: INestApplication<any>) {
    app.use(json({ limit: DEFAULT_LIMIT }))
    app.use(urlencoded({ extended: true, limit: DEFAULT_LIMIT }))
}
