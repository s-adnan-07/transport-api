import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'

type Environment = 'development' | 'production'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  const configService = app.get(ConfigService)
  const NODE_ENV = configService.get<Environment>('NODE_ENV')
  const PORT =
    NODE_ENV == 'development' ? 3000 : configService.get<number>('PORT')

  await app.listen(PORT)
}

bootstrap()
