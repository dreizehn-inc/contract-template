import TodoListArtifact from "../artifacts/contracts/TodoList.sol/TodoList.json"
import { ethers } from "ethers"

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

const provider = new ethers.providers.JsonRpcProvider();
const contract = new ethers.Contract(contractAddress, TodoListArtifact.abi, provider);

export const TodoList = {
  provider,
  contract
}