import GreeterArtifact from '../artifacts/contracts/Greeter.sol/Greeter.json'
import { ethers } from 'ethers'

const provider = new ethers.providers.JsonRpcProvider()
const signer = provider.getSigner(0)

export const Greeter = (contractAddress: string) => {
  const contract = new ethers.Contract(contractAddress, GreeterArtifact.abi, provider)
  return {
    provider,
    signer,
    contract
  }
}
