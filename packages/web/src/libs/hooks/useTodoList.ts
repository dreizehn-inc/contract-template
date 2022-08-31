import { useEffect, useState } from "react";
import ethers from "ethers"

export const useContent = (
  contract: ethers.Contract
) => {
  const { taskCount } = contract.functions;
  const [taskCountValue, setTaskCountValue] = useState<string>("");
  useEffect(() => {
    const getTaskCount = async () => {
      const _taskCount = await taskCount();
      setTaskCountValue(_taskCount);
    }
    getTaskCount()
  }, [])

  return {
    taskCount: taskCountValue
  }
}