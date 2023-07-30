import { ethers } from 'ethers'

import { Injectable } from '@nestjs/common'

import { environment } from '../environment'

@Injectable()
export class Web3Service {
  private readonly wallet: ethers.Wallet
  private readonly infuraAPIKey: string
  private readonly provider: ethers.providers.JsonRpcProvider

  constructor() {
    const privateKey = environment.WALLET_PRIVATE_KEY // PRIVATE_KEY of OPERATOR_ADDRESS
    this.infuraAPIKey = environment.INFURA_API_KEY
    this.provider = new ethers.providers.JsonRpcProvider(environment.NODE_URL)
    this.wallet = new ethers.Wallet(privateKey, this.provider)
  }

  getProvider() {
    return this.provider
  }

  getWallet(): ethers.Wallet {
    return this.wallet
  }

  async getBalance(chainId: number): Promise<string> {
    const provider = this.buildProvider(chainId)
    const balance = await provider.getBalance(this.wallet.address)
    return ethers.utils.formatEther(balance)
  }

  private getNetwork(chainId: number): string {
    switch (chainId) {
      case 1:
        return 'mainnet'
      case 3:
        return 'ropsten'
      case 4:
        return 'rinkeby'
      case 5:
        return 'goerli'
      case 42:
        return 'kovan'
      default:
        throw new Error('Unsupported chainId')
    }
  }

  public splitSignature(signature: string): { v: number; r: string; s: string } {
    const { v, r, s } = ethers.utils.splitSignature(signature)
    return { v, r, s }
  }

  // TODO(@k3nt0w): テストネットワーク用で利用。ローカルでは使えない
  private buildProvider(chainId: number) {
    const network = this.getNetwork(chainId)
    return new ethers.providers.JsonRpcProvider(`https://${network}.infura.io/v3/${this.infuraAPIKey}`, chainId)
  }

  async getTransactionConfirmations(transactionHash: string): Promise<number> {
    const transactionReceipt = await this.provider.getTransactionReceipt(transactionHash)
    if (!transactionReceipt) {
      throw new Error('Transaction not found')
    }
    const currentBlockNumber = await this.provider.getBlockNumber()
    return currentBlockNumber - transactionReceipt.blockNumber
  }
}
