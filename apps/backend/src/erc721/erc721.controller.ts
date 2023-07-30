import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ERC721Service } from './erc721.service'
import { PUBLIC_SERVICE } from '../swagger'

@ApiTags(PUBLIC_SERVICE)
@Controller('erc721')
export class ERC721Controller {
  constructor(private readonly erc721Service: ERC721Service) {}

  @Get('count')
  async count(@Query('address') address: string) {
    return await this.erc721Service.count(address)
  }

  @Post('mint')
  async create(@Body('to') to: string) {
    return await this.erc721Service.mint(to)
  }
}
