import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

export const TYPEORM_MODULE_PARAMS = TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow<string>(`DB_HOST`),
        port: configService.getOrThrow<number>(`DB_PORT`),
        username: configService.getOrThrow<string>(`DB_USER`),
        password: configService.getOrThrow<string>(`DB_PASSWORD`),
        database: configService.getOrThrow<string>(`DB_NAME`),
        migrations: ['src/migrations/*{.ts,.js}'],
        logging: false,
        entities: [],
    }),
})
