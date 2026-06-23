import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NodeEnv } from '@shared/enums/node-env.enum'

export function setupSwagger(app: INestApplication<any>, configService: ConfigService<unknown, boolean>) {
    const NODE_ENV = configService.getOrThrow<NodeEnv>('NODE_ENV')

    if (NODE_ENV === NodeEnv.DEVELOPMENT) {
        const config = new DocumentBuilder()
            .setTitle('Project API')
            .setDescription('REST API documentation for the project')
            .setVersion('1.0')
            .addBearerAuth()
            .build()

        const document = SwaggerModule.createDocument(app, config)

        SwaggerModule.setup('api/docs', app, document)
    }
}
