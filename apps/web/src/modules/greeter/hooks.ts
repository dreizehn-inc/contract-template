import { NFTMarketContractSDK } from '@nft-market/contract'
import { Address, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

if (typeof process.env.NEXT_PUBLIC_GREETER_CONTRACT_ADDRESS === 'undefined') {
  throw new Error('NEXT_PUBLIC_GREETER_CONTRACT_ADDRESS not defined')
}
export const contractAddress = process.env.NEXT_PUBLIC_GREETER_CONTRACT_ADDRESS as Address

export const useGreetContract = () => {
  const { data, isError, isLoading, isSuccess } = useContractRead({
    address: contractAddress,
    abi: NFTMarketContractSDK.Greeter__factory.abi,
    functionName: 'greet'
  })

  return { greet: data, isError, isSuccess, isLoading }
}

export const useSetGreetingContract = (greeting: string) => {
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: NFTMarketContractSDK.Greeter__factory.abi,
    functionName: 'setGreeting',
    args: [greeting]
  })

  const { data, error, isError, write: setGreeting } = useContractWrite(config)

  return { data, error, isError, setGreeting }
}
