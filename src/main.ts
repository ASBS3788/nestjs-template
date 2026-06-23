import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from '@app/app.module'
import { setupHelmet } from '@config/helmet.config'
import { setupCors } from '@config/cors.config'
import { setupPayload } from '@config/payload.config'
import { setupGlobalPipes } from '@config/global-pipes.config'
import { setupGlobalExceptionFilter } from '@config/global-exception-filter.config'
import { setupSwagger } from '@config/swagger.config'
import { ResponseInterceptor } from '@core/interceptors/response.interceptor'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const port = configService.getOrThrow<number>('PORT')

    app.setGlobalPrefix('api')

    app.useGlobalInterceptors(new ResponseInterceptor())

    // Helmet — дополнительная безопасность HTTP-заголовков
    setupHelmet(app)

    // CORS
    setupCors(app, configService)

    // Payload
    setupPayload(app)

    // Глобальная валидация
    setupGlobalPipes(app)

    // Глобальная обработка ошибок
    setupGlobalExceptionFilter(app)

    // Swagger документация
    setupSwagger(app, configService)

    await app.listen(port)
}

bootstrap().catch((err) => {
    console.error('Bootstrap failed:', err)
    process.exit(1)
})
