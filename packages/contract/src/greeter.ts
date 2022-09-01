import GreeterArtifact from '../artifacts/contracts/Greeter.sol/Greeter.json'
import { ethers } from 'ethers'

export const Greeter = (contractAddress: string, singer: ethers.providers.JsonRpcSigner) => {
  const contract = new ethers.Contract(contractAddress, GreeterArtifact.abi, singer)
  return {
    contract
  }
}
