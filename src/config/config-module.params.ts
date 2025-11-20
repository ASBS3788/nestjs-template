import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { NodeEnv } from '../shared/enums/node-env.enum'

export const CONFIG_MODULE_PARAMS = ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
        NODE_ENV: Joi.string()
            .valid(...Object.values(NodeEnv))
            .required(),
        PORT: Joi.number().required(),
        CORS_ORIGINS: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
    }),
})
