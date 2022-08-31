import TodoListArtifact from '../artifacts/contracts/TodoList.sol/TodoList.json'
import { ethers } from 'ethers'

export const TodoList = (contractAddress: string) => {
  const provider = new ethers.providers.JsonRpcProvider()
  const contract = new ethers.Contract(contractAddress, TodoListArtifact.abi, provider)
  return {
    provider,
    contract
  }
}
