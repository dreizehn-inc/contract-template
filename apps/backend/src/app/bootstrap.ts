import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { appEnv, environment } from '../environment'

async function bootstrap() {
  const options: NestApplicationOptions = appEnv.isLocal ? {} : { logger: new Logger() }
  const app = await NestFactory.create(AppModule, options)

  app.enableCors({
    origin: '*',
    allowedHeaders: '*'
  })

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  const server = await app.listen(environment.PORT)
  server.keepAliveTimeout = 70 * 1000
}
bootstrap().catch(err => {
  const logger = new Logger()
  logger.error(err)
  throw err
})
