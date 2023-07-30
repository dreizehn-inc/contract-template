import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { Transaction } from './transaction.base.request'
import { Pagination, PaginationQuery } from '../base/base.request'

// LIST /transactions

export abstract class PublicListTransactionsRequestQuery extends PaginationQuery {}

export abstract class PublicListTransactionsResponse {
  @ApiProperty({ type: Transaction, isArray: true, required: true })
  transactions: Transaction[]

  @ApiProperty({ type: Pagination })
  pagination: Pagination
}

// GET /transactions/{id}
export abstract class PublicGetTransactionRequestParam {
  @ApiProperty({ required: true })
  @IsString()
  id: string
}
export abstract class PublicGetTransactionResponse {
  @ApiProperty({ type: Transaction })
  transaction: Transaction
}
