import { ConfigModule } from '@nestjs/config'
import { NodeEnv } from '@shared/enums/node-env.enum'
import * as Joi from 'joi'

export const CONFIG_MODULE_PARAMS = ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
        NODE_ENV: Joi.string()
            .valid(...Object.values(NodeEnv))
            .required(),
        PORT: Joi.number().required(),
        CORS_ORIGINS: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
    }),
})
