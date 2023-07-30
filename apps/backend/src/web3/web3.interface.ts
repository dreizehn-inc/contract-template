import { ethers } from 'ethers'

export interface IWeb3Service {
  getWallet(): ethers.Wallet
  getBalance(chainId: number): Promise<string>
}
