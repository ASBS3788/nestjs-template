import { INestApplication, ValidationPipe } from '@nestjs/common'

export function setupGlobalPipes(app: INestApplication<any>) {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    )
}
