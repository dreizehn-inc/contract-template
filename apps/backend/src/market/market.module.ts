import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MarketController } from './market.controller'
import { MarketService } from './market.service'
import { Signature } from '../signature/signature.entity'
import { Web3Module } from '../web3/web3.module'

@Module({
  imports: [Web3Module, TypeOrmModule.forFeature([Signature])],
  controllers: [MarketController],
  providers: [MarketService]
})
export class MarketModule {}
