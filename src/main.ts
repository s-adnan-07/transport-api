import { NestApplication, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger, ValidationPipe } from '@nestjs/common'

type Environment = 'development' | 'production'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  const logger = new Logger(NestApplication.name, { timestamp: true })

  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT')
  const config = new DocumentBuilder()
    .setTitle('Transport API')
    .setDescription(
      'CRUD endpoints to manage vehicle operations. Built as part of the assessment for Wiot360 by Adnan',
    )
    .setVersion('1.0.0')
    .addTag('Routes')
    .build()

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  })
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, '0.0.0.0')

  logger.log(`Server running on port ${PORT}`)
}

bootstrap()
