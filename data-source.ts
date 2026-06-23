import * as dotenv from 'dotenv'
dotenv.config()

import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'mysql',
    port: Number(process.env.DATABASE_PORT),
    host: String(process.env.DATABASE_HOST),
    database: String(process.env.DATABASE_NAME),
    username: String(process.env.DATABASE_USER),
    password: String(process.env.DATABASE_PASSWORD),
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
    logging: true,
    synchronize: false, // всегда false для миграций
})
