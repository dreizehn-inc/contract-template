import { Module } from '@nestjs/common'

import { FactoryController } from './factory.controller'
import { FactoryService } from './factory.service'
import { Web3Module } from '../web3/web3.module'

@Module({
  controllers: [FactoryController],
  providers: [FactoryService],
  imports: [Web3Module]
})
export class FactoryModule {}
