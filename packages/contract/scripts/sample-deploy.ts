import { ethers } from 'hardhat'

import { RoleManagerStore, ERC721Dreizehn } from '../src'

async function main() {
  /*
    1. Role Contract & RoleManagerStore Contract のデプロイ
  */
  const [owner] = await ethers.getSigners()

  const role = await ethers.getContractFactory('Role')
  const roleContract = await role.deploy()

  console.log('Role deployed to:', roleContract.address)

  const roleManagerStore = await ethers.getContractFactory('RoleManagerStore')
  let roleManagerStoreContract: RoleManagerStore
  let erc721DreizehnContract: ERC721Dreizehn

  if (process.env.DEPLOY_ENV === 'prd') {
    // 本番環境にデプロイする場合は環境変数からアドレスを取得する
    if (!process.env.OWNER_ADDRESS || !process.env.OPERATOR_ADDRESS || !process.env.TOKEN_MANAGER_ADDRESS) {
      throw new Error('environment variable not set')
    }
    const ownerAddr = process.env.OWNER_ADDRESS
    const operatorAddr = process.env.OPERATOR_ADDRESS
    const tokenManagerAddr = process.env.TOKEN_MANAGER_ADDRESS
    roleManagerStoreContract = await roleManagerStore.deploy(ownerAddr, operatorAddr, tokenManagerAddr)
    console.log('=== prd Deploy ===')
    console.log('Owner Address:', ownerAddr)
    console.log('Operator Address:', operatorAddr)
    console.log('Token Manager Address:', tokenManagerAddr)
  } else {
    // ローカル環境にデプロイする場合はhardhatで生成したownerアドレスを利用する
    roleManagerStoreContract = await roleManagerStore.deploy(owner.address, owner.address, owner.address)
    console.log('=== Local Deploy ===')
    console.log('Owner & Operator & Token Manager Addresses:', owner.address)
  }

  console.log('RoleManagerStore deployed to:', roleManagerStoreContract.address)

  /*
    2. Factory Contract のデプロイ
  */
  const factory = await ethers.getContractFactory('Factory')
  const factoryContract = await factory.deploy(roleManagerStoreContract.address)

  console.log('Factory deployed to:', factoryContract.address)

  /*
    3. Factory Contract を利用して ERC721Dreizehn Contract をデプロイ
    別のNFTをデプロイする場合は引数を変えることでこのFactory Contractからデプロイすることが可能
  */
  const salt = ethers.utils.randomBytes(32)
  await factoryContract.deploy(
    'Visualize NFT (Example)',
    'VNFT',
    'http://example.com/',
    '.json',
    roleManagerStoreContract.address,
    salt
  )
  const erc721DreizehnContractAddr = await factoryContract.calcAddress(
    'Visualize NFT (Example)',
    'VNFT',
    'http://example.com/',
    '.json',
    roleManagerStoreContract.address,
    salt
  )

  const nftFactory = await ethers.getContractFactory('ERC721Dreizehn')
  erc721DreizehnContract = nftFactory.attach(erc721DreizehnContractAddr)
  // 2次流通を制限する
  await erc721DreizehnContract.enableRestrictedTransfer()

  console.log('ERC721DreizehnContract deployed to:', erc721DreizehnContractAddr)
  console.log(
    'ERC721DreizehnContract restrictedTransferEnabled:',
    await erc721DreizehnContract.restrictedTransferEnabled({ gasLimit: 1000000 })
  )

  /*
    4. marketForOffchainPayment Contract のデプロイ
  */
  const marketForOffchainPayment = await ethers.getContractFactory('MarketForOffchainPayment')
  const marketForOffchainPaymentContract = await marketForOffchainPayment.deploy(roleManagerStoreContract.address)

  // MarketForOffchainPaymentにTokenManager権限を付与する
  await roleManagerStoreContract.setTokenManager(marketForOffchainPaymentContract.address)

  console.log('MarketForOffchainPaymentContract deployed to:', marketForOffchainPaymentContract.address)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
