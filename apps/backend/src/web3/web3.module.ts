import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { Web3Controller } from './web3.controller'
import { Web3Service } from './web3.service'

@Module({
  controllers: [Web3Controller],
  providers: [Web3Service],
  exports: [Web3Service],
  imports: [HttpModule]
})
export class Web3Module {}
