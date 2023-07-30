import { NFTMarketContractSDK } from '@nft-market/contract'
import { ContractReceipt } from 'ethers'

import { Injectable } from '@nestjs/common'

import { environment } from '../environment'
import { Web3Service } from '../web3/web3.service'

@Injectable()
export class ERC721Service {
  private erc721: NFTMarketContractSDK.ERC721Visualize

  constructor(private web3Service: Web3Service) {
    const contractAddress = environment.ERC721_MADEBY_FACTORY_CONTRACT_ADDRESS
    const wallet = this.web3Service.getWallet()
    this.erc721 = NFTMarketContractSDK.ERC721Visualize__factory.connect(contractAddress, wallet)
  }

  async mint(to: string): Promise<ContractReceipt> {
    const tx = await this.erc721.mint(to)
    return await tx.wait()
  }

  async count(address: string): Promise<string> {
    const count = await this.erc721.balanceOf(address)
    return count.toString()
  }
}
