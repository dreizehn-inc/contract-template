import ethers from 'ethers'
import { useState } from 'react'

export const useGreeter = (contract: ethers.Contract) => {
  const [message, setMessage] = useState('')
  const { greet, setGreeting } = contract.functions
  const fetchMessage = async () => setMessage(await greet())
  return { message, fetchMessage, setGreeting }
}
