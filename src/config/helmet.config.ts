import { INestApplication } from '@nestjs/common'
import helmet from 'helmet'

export function setupHelmet(app: INestApplication<any>) {
    app.use(helmet())
}
