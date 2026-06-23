import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CONFIG_MODULE_PARAMS } from '@config/config-module.params'
import { TYPEORM_MODULE_PARAMS } from '@config/type-orm-module.params'
import { GlobalExceptionFilter } from './exceptions/global-exception.filter'

@Global()
@Module({
    imports: [CONFIG_MODULE_PARAMS, TYPEORM_MODULE_PARAMS],
    providers: [ConfigService, GlobalExceptionFilter],
    exports: [],
})
export class CoreModule {}
