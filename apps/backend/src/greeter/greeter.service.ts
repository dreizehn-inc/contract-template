import { NFTMarketContractSDK } from '@nft-market/contract'

import { Injectable } from '@nestjs/common'

import { environment } from '../environment'
import { Web3Service } from '../web3/web3.service'

@Injectable()
export class GreeterService {
  private greeter: NFTMarketContractSDK.Greeter

  constructor(private web3Service: Web3Service) {
    const contractAddress = environment.GREETER_CONTRACT_ADDRESS
    const wallet = this.web3Service.getWallet()
    this.greeter = NFTMarketContractSDK.Greeter__factory.connect(contractAddress, wallet)
  }

  async greet(): Promise<{ greeting: string }> {
    const greeting = await this.greeter.greet()
    return { greeting }
  }

  async create(newGreeting: string): Promise<{ greeting: string }> {
    const tx = await this.greeter.setGreeting(newGreeting)
    await tx.wait()
    const greeting = await this.greeter.greet()
    return { greeting }
  }

  async getTransactionConfirmations(transactionHash: string): Promise<number> {
    const provider = this.web3Service.getProvider()
    const transactionReceipt = await provider.getTransactionReceipt(transactionHash)
    if (!transactionReceipt) {
      throw new Error('Transaction not found')
    }
    const currentBlockNumber = await provider.getBlockNumber()
    return currentBlockNumber - transactionReceipt.blockNumber
  }
}
