import { NFTMarketContractSDK } from '@nft-market/contract'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { environment } from '../environment'
import { Signature, SignatureRepository } from '../signature/signature.entity'
import { uid } from '../util'
import { Web3Service } from '../web3/web3.service'

@Injectable()
export class MarketService {
  private market: NFTMarketContractSDK.MarketForOffchainPayment

  constructor(
    @InjectRepository(Signature)
    private signatureRepository: SignatureRepository,
    private web3Service: Web3Service
  ) {
    const contractAddress = environment.MARKET_FOR_CREDIT_CARD_CONTRACT_ADDRESS
    const wallet = this.web3Service.getWallet()
    this.market = NFTMarketContractSDK.MarketForOffchainPayment__factory.connect(contractAddress, wallet)
  }

  async transferForOperator(param: { tokenId: number; chainId: number; to: string }): Promise<{ blockhash?: string }> {
    // 1. 決済代行会社との通信
    // ここで決済登録をしてOrderIDを取得する
    // 簡単のためOrderIDはUUIDとして生成する
    const orderId = uid.new()
    console.log(orderId)

    // 2. リクエストパラメータのto address, tokenId, chainId を用いて
    // DBに保存されてる from address, signature, deadline を取得する
    const {
      sign: signature,
      nonce,
      deadline,
      user: { id: from }
    } = await this.signatureRepository.findOneOrFail({
      relations: { user: true },
      where: { tokenId: param.tokenId, chainId: param.chainId }
    })

    // 3. FactoryでデプロイされたERC721のコントラクトアドレスを取得する
    // サンプル実装のため、デプロイ後に取得したコントラクトアドレスを環境変数に指定している
    // 本来ならデプロイ時にコントラクトアドレスをchainIdなどと紐付けて永続化しておく必要がある
    const erc721ContractAddress = environment.ERC721_MADEBY_FACTORY_CONTRACT_ADDRESS

    // 4. signatureを分解する

    const { v, r, s } = this.web3Service.splitSignature(signature)

    console.log({
      erc721ContractAddress,
      from,
      to: param.to,
      tokenId: param.tokenId,
      deadline
    })

    // 5. TransferForOperatorを実行する
    const tx = await this.market.transferForTokenManager(
      erc721ContractAddress,
      from,
      param.to,
      param.tokenId,
      nonce,
      deadline,
      v,
      r,
      s
    )
    await tx.wait()
    return { blockhash: tx.blockHash }
  }
}
