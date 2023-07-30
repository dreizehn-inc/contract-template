import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Web3Service } from './web3.service'
import { PUBLIC_SERVICE } from '../swagger'

@ApiTags(PUBLIC_SERVICE)
@Controller('web3')
export class Web3Controller {
  constructor(private readonly web3Service: Web3Service) {}

  @Get('balance')
  async getBalance(@Query('chainId') chainId: number): Promise<string> {
    return await this.web3Service.getBalance(chainId)
  }
}
