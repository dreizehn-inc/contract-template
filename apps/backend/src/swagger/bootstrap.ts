require('dotenv').config()

import { writeFileSync } from 'fs'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from '../app/app.module'
import { environment } from '../environment'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('NFT Market')
    .setDescription('NFT Market API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)

  writeFileSync('./swagger.json', JSON.stringify(document))
  SwaggerModule.setup('/', app, document)

  app.enableCors({
    origin: '*',
    allowedHeaders: '*'
  })
  // app.useLogger(app.get(Logger))
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(environment.PORT)
}
bootstrap().catch(err => {
  console.error(err)
})
