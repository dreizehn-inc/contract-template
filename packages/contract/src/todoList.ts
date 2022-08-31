import TodoListArtifact from '../artifacts/contracts/TodoList.sol/TodoList.json'
import { ethers } from 'ethers'

const contractAddress = process.env.TODO_LIST_CONTRACT_ADDRESS || ''

const provider = new ethers.providers.JsonRpcProvider()
const contract = new ethers.Contract(contractAddress, TodoListArtifact.abi, provider)

export const TodoList = {
  provider,
  contract
}
