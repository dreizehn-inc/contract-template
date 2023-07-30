import { LoggingInterceptor } from '@algoan/nestjs-logging-interceptor'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { CommandModule } from 'nestjs-command'
import { DataSource } from 'typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from '../database/database.module'
import { ERC721Module } from '../erc721/erc721.module'
import { FactoryModule } from '../factory/factory.module'
import { GreeterModule } from '../greeter/greeter.module'
import { MarketModule } from '../market/market.module'
import { SignatureModule } from '../signature/signature.module'
import { UserModule } from '../user/user.module'
import { Web3Module } from '../web3/web3.module'

@Module({
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }, AppService],
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    SignatureModule,
    CommandModule,
    Web3Module,
    GreeterModule,
    FactoryModule,
    MarketModule,
    ERC721Module
  ],
  controllers: [AppController]
})
export class AppModule {
  // @ts-ignore
  configure(private dataSource: DataSource) {
    // consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
