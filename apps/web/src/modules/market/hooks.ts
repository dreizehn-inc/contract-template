import { BigNumber } from 'ethers'
import { useCallback } from 'react'
import { Address, useAccount, useProvider, useSignTypedData } from 'wagmi'

if (typeof process.env.NEXT_PUBLIC_MARKET_FOR_CREDIT_CARD_CONTRACT_ADDRESS === 'undefined') {
  throw new Error('NEXT_PUBLIC_MARKET_FOR_CREDIT_CARD_CONTRACT_ADDRESS not defined')
}
export const marketContractAddress = process.env.NEXT_PUBLIC_MARKET_FOR_CREDIT_CARD_CONTRACT_ADDRESS as Address

if (typeof process.env.NEXT_PUBLIC_ERC721_MADEBY_FACTORY_CONTRACT_ADDRESS === 'undefined') {
  throw new Error('NEXT_PUBLIC_ERC721_MADEBY_FACTORY_CONTRACT_ADDRESS not defined')
}
export const erc721ContractAddress = process.env.NEXT_PUBLIC_ERC721_MADEBY_FACTORY_CONTRACT_ADDRESS as Address

export const useSignPermit = () => {
  const account = useAccount()
  const provider = useProvider()
  const { signTypedDataAsync } = useSignTypedData()

  const signPermit = useCallback(
    async (tokenId: number) => {
      if (!tokenId || !account || !provider || !account.address) {
        throw new Error('invalid params')
      }
      const nonce = Date.now()
      const tomorrowUnix = BigNumber.from(Math.floor(new Date().setHours(new Date().getHours() + 24) / 1000))
      const chainId = (await provider.getNetwork()).chainId

      const types = {
        Permit: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
          { name: 'tokenId', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' }
        ]
      }
      const domain = {
        name: 'Visualize NFT',
        version: '1',
        chainId,
        verifyingContract: erc721ContractAddress
      }
      const value = {
        owner: account.address,
        spender: marketContractAddress,
        tokenId,
        nonce,
        deadline: tomorrowUnix
      }
      const data = await signTypedDataAsync({ domain, types, value })
      return { data, chainId, deadline: tomorrowUnix.toNumber(), nonce }
    },
    [account, provider, signTypedDataAsync]
  )

  return { signPermit }
}
