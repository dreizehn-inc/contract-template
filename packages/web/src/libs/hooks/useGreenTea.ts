import { useEffect, useState } from "react";
import ethers from "ethers"

export const useGreenTeaContent = (
  contract: ethers.Contract
) => {
  const { greet } = contract.functions;
  const [greeting, setGreeting] = useState<string>("");
  useEffect(() => {
    const getTaskCount = async () => {
      const _greetingt = await greet();
      setGreeting(_greetingt);
    }
    getTaskCount()
  }, [])

  return {
    greeting
  }
}