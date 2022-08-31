import { useEffect, useState } from 'react'
import ethers from 'ethers'

export const useGreeter = (contract: ethers.Contract) => {
  const { greet } = contract.functions
  const [greeting, setGreeting] = useState<string>('')
  useEffect(() => {
    const getGreeting = async () => {
      const greeting = await greet()
      setGreeting(greeting)
    }
    getGreeting()
  }, [])

  return { greeting }
}
