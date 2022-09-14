import ethers from 'ethers'
import { useState } from 'react'
import { Web3BoilerSDK } from '@web3-boiler/contract'

export const useGreeter = (signer: ethers.providers.JsonRpcSigner) => {
  const address = process.env.NEXT_PUBLIC_GREETER_CONTRACT_ADDRESS
  if (!address) {
    throw new Error('invalid contract address')
  }
  const [message, setMessage] = useState('')
  const Greeter = new Web3BoilerSDK.Greeter__factory(signer).attach(address)
  const { greet, setGreeting } = Greeter.functions
  const fetchMessage = async () => {
    const greets = await greet()
    if (greets && greets?.length > 0) {
      setMessage(greets?.[0])
    }
  }
  return { message, fetchMessage, setGreeting }
}
