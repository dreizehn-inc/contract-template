import ethers from 'ethers'
import { Web3BoilerSDK } from '@web3-boiler/contract'
import { useState } from 'react'

export const useNFT = (signer: ethers.providers.JsonRpcSigner) => {
  const address = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
  if (!address) {
    throw new Error('invalid contract address')
  }
  const NFT = new Web3BoilerSDK.NFT__factory(signer).attach(address)
  const [uri, setURI] = useState('')
  const { mint, tokenURI } = NFT.functions
  const fetchTokenURI = async () => {
    const uris = await tokenURI(0)
    if (uris && uris?.length > 0) {
      setURI(uris?.[0])
    }
  }
  return { mint, uri, fetchTokenURI }
}
