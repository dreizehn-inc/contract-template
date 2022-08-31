import GreeterArtifact from '../artifacts/contracts/Greeter.sol/Greeter.json'
import { ethers } from 'ethers'

const contractAddress = process.env.GREENTER_CONTRACT_ADDRESS || ''

const provider = new ethers.providers.JsonRpcProvider()
const signer = provider.getSigner(0)
const contract = new ethers.Contract(contractAddress, GreeterArtifact.abi, provider)

export const Greeter = {
  provider,
  signer,
  contract
}
