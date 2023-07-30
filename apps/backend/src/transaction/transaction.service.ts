import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, IsNull } from 'typeorm'

import { Transaction as TransactionResponse } from './transaction.base.request'
import { Transaction, TransactionRepository } from './transaction.entity'
import * as marshaller from './transaction.marshaller'
import { PublicGetTransactionRequestParam, PublicListTransactionsRequestQuery } from './transaction.request'
import { calcPaginationParam } from '../util'
import { Web3Service } from '../web3/web3.service'

@Injectable()
export class TransactionService {
  private readonly logger = new Logger()
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: TransactionRepository,
    private web3Service: Web3Service
  ) {}

  async list(param: PublicListTransactionsRequestQuery) {
    const { skip, take } = calcPaginationParam(param.page, param.perPage)

    let where: FindManyOptions<Transaction>['where'] = {
      deletedAt: IsNull()
    }
    const entities = await this.transactionRepository.find({ where, skip, take }).catch(e => {
      this.logger.error(e)
      throw new NotFoundException(`Transaction not found.`)
    })
    const ttlCnt = await this.transactionRepository.count({ where })
    return { transactions: marshaller.entitiesToRequests(entities), ttlCnt }
  }

  async get({ id }: PublicGetTransactionRequestParam): Promise<TransactionResponse> {
    return this.transactionRepository
      .findOneOrFail({ where: { id, deletedAt: IsNull() } })
      .then(e => ({ ...e }))
      .catch(e => {
        this.logger.error(e)
        throw new NotFoundException(`Transaction not found. id: ${id}`)
      })
  }

  async listUnconfirmedTransactions(): Promise<{ transactions: string[] }> {
    const transactions = await this.transactionRepository.find({ where: { status: 'IN_PROGRESS' } })

    const unconfirmedTransactionHashes: string[] = []
    for (const transaction of transactions) {
      try {
        const confirmations = await this.web3Service.getTransactionConfirmations(transaction.hash)
        if (confirmations < 2) {
          unconfirmedTransactionHashes.push(transaction.hash)
        }
      } catch (error) {
        continue
      }
    }
    return { transactions: unconfirmedTransactionHashes }
  }
}
