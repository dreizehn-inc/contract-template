import { Module } from '@nestjs/common'

import { GreeterController } from './greeter.controller'
import { GreeterService } from './greeter.service'
import { Web3Module } from '../web3/web3.module'

@Module({
  controllers: [GreeterController],
  providers: [GreeterService],
  imports: [Web3Module]
})
export class GreeterModule {}
