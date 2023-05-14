import { ethers } from 'hardhat'

async function main() {
  console.log('Deploying contracts...')
  const [owner] = await ethers.getSigners()
  console.log(owner)

  const greeter = await ethers.getContractFactory('Greeter')
  const greeterContract = await greeter.deploy('Hello, Hardhat!')

  console.log('GreeterContract deployed to:', greeterContract.address)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
