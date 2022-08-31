import { useEffect, useState } from 'react'
import ethers from 'ethers'

export const useGreeter = (contract: ethers.Contract) => {
  const { greet } = contract.functions
  const [greeting, setGreeting] = useState<string>('')
  useEffect(() => {
    const getTaskCount = async () => {
      const greeting = await greet()
      setGreeting(greeting)
    }
    getTaskCount()
  }, [])

  return { greeting }
}
