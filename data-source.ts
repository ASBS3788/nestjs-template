import * as dotenv from 'dotenv'
dotenv.config()

import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: String(process.env.DB_HOST),
    port: Number(process.env.DATABASE_PORT),
    username: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_NAME),
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*{.ts,.js}'],
    logging: true,
    synchronize: false, // всегда false для миграций
})
