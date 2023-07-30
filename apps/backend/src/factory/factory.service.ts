import { NFTMarketContractSDK } from '@nft-market/contract'
import { ethers } from 'ethers'

import { Injectable } from '@nestjs/common'

import { environment } from '../environment'
import { Web3Service } from '../web3/web3.service'

@Injectable()
export class FactoryService {
  private factory: NFTMarketContractSDK.Factory

  constructor(private web3Service: Web3Service) {
    const contractAddress = environment.FACTORY_CONTRACT_ADDRESS
    const wallet = this.web3Service.getWallet()
    this.factory = NFTMarketContractSDK.Factory__factory.connect(contractAddress, wallet)
  }

  async deploy(param: {
    name: string
    symbol: string
    defaultUriPrefix: string
    defaultUriSuffix: string
  }): Promise<{ contractAddress: string }> {
    const salt = ethers.utils.randomBytes(32)
    await this.factory.deploy(
      param.name,
      param.symbol,
      param.defaultUriPrefix,
      param.defaultUriSuffix,
      environment.OPERATOR_ADDRESS,
      salt
    )
    const erc721VisualizeContractAddr = await this.factory.calcAddress(
      param.name,
      param.symbol,
      param.defaultUriPrefix,
      param.defaultUriSuffix,
      environment.OPERATOR_ADDRESS,
      salt
    )
    return { contractAddress: erc721VisualizeContractAddr }
  }
}
