import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export function setupCors(app: INestApplication<any>, configService: ConfigService<unknown, boolean>) {
    const CORS_ORIGINS = configService.getOrThrow<string>(`CORS_ORIGINS`)

    app.enableCors({
        origin: CORS_ORIGINS.split(`,`),
        methods: [`GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `OPTIONS`],
        allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
}
