import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import {
  PublicListTransactionsResponse,
  PublicGetTransactionRequestParam,
  PublicGetTransactionResponse,
  PublicListTransactionsRequestQuery
} from './transaction.request'
import { TransactionService } from './transaction.service'
import { newPagination } from '../pagination'
import { PUBLIC_SERVICE } from '../swagger'

@ApiTags(PUBLIC_SERVICE)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'Transactionの一覧取得' })
  @ApiOkResponse({ type: PublicListTransactionsResponse })
  @Get()
  async list(@Query() param: PublicListTransactionsRequestQuery): Promise<PublicListTransactionsResponse> {
    const { transactions, ttlCnt } = await this.transactionService.list(param)
    const pagination = newPagination({ page: param.page, perPage: param.perPage, ttlCnt })
    return { transactions, pagination }
  }

  @ApiOperation({ summary: 'Transactionの詳細取得' })
  @ApiOkResponse({ type: PublicGetTransactionResponse })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  async get(@Param('id') id: PublicGetTransactionRequestParam['id']): Promise<PublicGetTransactionResponse> {
    return { transaction: await this.transactionService.get({ id }) }
  }
}
