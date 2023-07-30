import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TransactionController } from './transaction.controller'
import { Transaction } from './transaction.entity'
import { TransactionService } from './transaction.service'
import { Web3Module } from '../web3/web3.module'

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), Web3Module],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
