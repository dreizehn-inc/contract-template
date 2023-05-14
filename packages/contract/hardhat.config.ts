import * as dotenv from 'dotenv'
import { HardhatUserConfig, task } from 'hardhat/config'

import '@openzeppelin/hardhat-upgrades'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-gas-reporter'
import 'solidity-coverage'

dotenv.config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    // eslint-disable-next-line no-console
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  networks: {
    ropsten: {
      chainId: 1337,
      url: process.env.ROPSTEN_URL || 'http://localhost:8545',
      accounts: process.env.WALLET_PRIVATE_KEY !== undefined ? [process.env.WALLET_PRIVATE_KEY] : []
    },
    goerli: {
      chainId: 5,
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: process.env.WALLET_PRIVATE_KEY !== undefined ? [process.env.WALLET_PRIVATE_KEY] : [],
      gasPrice: 20000000000 // 20 Gwei
    },
    mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.INFURA_API_KEY}`,
      accounts: process.env.WALLET_PRIVATE_KEY !== undefined ? [process.env.WALLET_PRIVATE_KEY] : []
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD'
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  typechain: {
    outDir: 'src/generated',
    target: 'ethers-v5'
  }
}

export default config
