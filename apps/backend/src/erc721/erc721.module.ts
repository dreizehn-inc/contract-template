import { Module } from '@nestjs/common'

import { ERC721Controller } from './erc721.controller'
import { ERC721Service } from './erc721.service'
import { Web3Module } from '../web3/web3.module'

@Module({
  controllers: [ERC721Controller],
  providers: [ERC721Service],
  imports: [Web3Module]
})
export class ERC721Module {}
