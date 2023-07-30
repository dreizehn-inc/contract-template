import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { MarketService } from './market.service'
import { PUBLIC_SERVICE } from '../swagger'

@ApiTags(PUBLIC_SERVICE)
@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post('transfer')
  async transfer(@Body() param: { to: string; tokenId: number; chainId: number }): Promise<{ blockhash?: string }> {
    return await this.marketService.transferForOperator(param)
  }
}
