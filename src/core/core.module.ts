import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CONFIG_MODULE_PARAMS } from 'src/config/config-module.params'
import { TYPEORM_MODULE_PARAMS } from 'src/config/type-orm-module.params'
import { GlobalExceptionFilter } from 'src/core/filters/global-exception.filter'
import { ExceptionParserService } from './services/exception-parser.service'
import { ResponseHelper } from 'src/shared/lib/response.helper'

@Global()
@Module({
    imports: [
        CONFIG_MODULE_PARAMS,
        //TYPEORM_MODULE_PARAMS
    ],
    providers: [ConfigService, GlobalExceptionFilter, ExceptionParserService, ResponseHelper],
    exports: [ResponseHelper],
})
export class CoreModule {}
