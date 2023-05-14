import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from 'chai'
import { fromRpcSig } from 'ethereumjs-util'
import { BigNumberish, BigNumber } from 'ethers'
import hre, { ethers } from 'hardhat'

import { Role, RoleManagerStore, MarketForOffchainPayment, ERC721Dreizehn } from '../src/generated'

const tokenID = 0

const chainId = hre.network.config.chainId!

const typedData = {
  types: {
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' }
    ]
  },
  primaryType: 'Permit' as const
}
const buildData = (
  chainId: number,
  verifyingContract: string,
  name: string,
  version: string,
  owner: string,
  spender: string,
  tokenId: BigNumberish,
  nonce: BigNumber,
  deadline: BigNumber
) => {
  return Object.assign({}, typedData, {
    domain: {
      name,
      version,
      chainId,
      verifyingContract
    },
    message: { owner, spender, tokenId, nonce, deadline }
  })
}

describe('All Contract Test', function () {
  let erc721DreizehnContract: ERC721Dreizehn
  let roleContract: Role
  let roleManagerStoreContract: RoleManagerStore
  let marketForOffchainPaymentContract: MarketForOffchainPayment
  let owner: SignerWithAddress
  let addr1: SignerWithAddress
  let addr2: SignerWithAddress

  beforeEach(async () => {
    ;[owner, addr1, addr2] = await ethers.getSigners()
    const role = await ethers.getContractFactory('Role')
    roleContract = await role.deploy()
    const roleManagerStore = await ethers.getContractFactory('RoleManagerStore')
    roleManagerStoreContract = await roleManagerStore.deploy(owner.address, owner.address, owner.address)
    const factory = await ethers.getContractFactory('Factory')
    let factoryContract = await factory.deploy(roleManagerStoreContract.address)
    const salt = ethers.utils.randomBytes(32)
    const erc721DreizehnContractAddr = await factoryContract.calcAddress(
      'Test NFT',
      'TNFT',
      'http://example.com/',
      '.json',
      roleManagerStoreContract.address,
      salt
    )
    await factoryContract.deploy(
      'Test NFT',
      'TNFT',
      'http://example.com/',
      '.json',
      roleManagerStoreContract.address,
      salt
    )
    const nftFactory = await ethers.getContractFactory('ERC721Dreizehn')
    erc721DreizehnContract = nftFactory.attach(erc721DreizehnContractAddr)

    const marketForOffchainPaymentFactory = await ethers.getContractFactory('MarketForOffchainPayment')
    marketForOffchainPaymentContract = await marketForOffchainPaymentFactory.deploy(roleManagerStoreContract.address)
  })

  describe('roleManagerStoreContract', function () {
    it('setTokenManager, removeTokenManager success', async function () {
      const role = await roleContract.functions.TOKEN_MANAGER_ROLE().then(v => v[0])
      expect(await erc721DreizehnContract.hasRole(role, addr1.address)).to.be.false
      await roleManagerStoreContract.setTokenManager(addr1.address)
      expect(await erc721DreizehnContract.hasRole(role, addr1.address)).to.be.true
      await roleManagerStoreContract.removeTokenManager(addr1.address)
      expect(await erc721DreizehnContract.hasRole(role, addr1.address)).to.be.false
    })

    it('setOperator, removeOperator success', async function () {
      const role = await roleContract.functions.OPERATOR_ROLE().then(v => v[0])
      expect(await erc721DreizehnContract.hasRole(role, addr1.address)).to.be.false
      await roleManagerStoreContract.setOperator(addr1.address)
      expect(await erc721DreizehnContract.hasRole(role, addr1.address)).to.be.true
      await roleManagerStoreContract.removeOperator(addr1.address)
      expect(await erc721DreizehnContract.hasRole(role, addr1.address)).to.be.false
    })

    it('setTokenManager is onlyOperator', async function () {
      await expect(roleManagerStoreContract.connect(addr1).setTokenManager(addr1.address)).to.be.reverted
    })

    it('oparator can setTokenManager, removeTokenManager', async function () {
      await roleManagerStoreContract.setOperator(addr1.address)
      await expect(roleManagerStoreContract.connect(addr1).setTokenManager(addr2.address)).not.to.be.reverted
      await expect(roleManagerStoreContract.connect(addr1).removeTokenManager(addr2.address)).not.to.be.reverted
    })

    it('removeTokenManager is onlyOperator', async function () {
      await expect(roleManagerStoreContract.connect(addr1).removeTokenManager(addr1.address)).to.be.reverted
    })

    it('setOperator is onlyOperator', async function () {
      await expect(roleManagerStoreContract.connect(addr1).setOperator(addr1.address)).to.be.reverted
    })

    it('removeOparator is onlyOparator', async function () {
      await expect(roleManagerStoreContract.connect(addr1).removeOperator(addr1.address)).to.be.reverted
    })

    it('oparator can setOperator, removeOperator', async function () {
      await roleManagerStoreContract.setOperator(addr1.address)
      await expect(roleManagerStoreContract.connect(addr1).setOperator(addr2.address)).not.to.be.reverted
      await expect(roleManagerStoreContract.connect(addr1).removeOperator(addr2.address)).not.to.be.reverted
    })
  })

  describe('erc721DreizehnContract', function () {
    it('Deployment should assign the total supply of tokens to the owner', async function () {
      const ownerBalance = await erc721DreizehnContract.balanceOf(owner.address)
      expect(await erc721DreizehnContract.totalSupply()).to.equal(ownerBalance)
    })

    it('pause success', async function () {
      await erc721DreizehnContract.mint(owner.address)
      expect(await erc721DreizehnContract.balanceOf(owner.address)).to.equal(1)
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(0)
      await erc721DreizehnContract.pause()
      await expect(erc721DreizehnContract.transferFrom(owner.address, addr1.address, tokenID)).to.be.reverted
      expect(await erc721DreizehnContract.balanceOf(owner.address)).to.equal(1)
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(0)
    })

    it('name success', async function () {
      expect(await erc721DreizehnContract.name()).to.equal('Test NFT')
    })

    it('symbol success', async function () {
      expect(await erc721DreizehnContract.symbol()).to.equal('TNFT')
    })

    it('supportsInterface success', async function () {
      // ERC165
      expect(await erc721DreizehnContract.supportsInterface('0x01ffc9a7')).to.be.true
      // ERC721
      expect(await erc721DreizehnContract.supportsInterface('0x80ac58cd')).to.be.true
      // ERC721MetaData
      expect(await erc721DreizehnContract.supportsInterface('0x5b5e139f')).to.be.true
      // ERC721Enumerable
      expect(await erc721DreizehnContract.supportsInterface('0x780e9d63')).to.be.true
      // IERC721Dreizehn
      // expect(await erc721DreizehnContract.supportsInterface("0xf473e884")).to.be
      //   .true;
      // ERC721Exists
      expect(await erc721DreizehnContract.supportsInterface('0x4f558e79')).to.be.false
    })

    it('mint success', async function () {
      expect(await erc721DreizehnContract.totalSupply()).to.equal(0)
      await erc721DreizehnContract.mint(owner.address)
      expect(await erc721DreizehnContract.totalSupply()).to.equal(1)
    })

    it('mint is onlyTokenManager', async function () {
      expect(await erc721DreizehnContract.totalSupply()).to.equal(0)
      await expect(erc721DreizehnContract.connect(addr1).mint(addr1.address)).to.be.reverted
      expect(await erc721DreizehnContract.totalSupply()).to.equal(0)
    })

    it('tokenManager can mint', async function () {
      await roleManagerStoreContract.setTokenManager(addr1.address)
      expect(await erc721DreizehnContract.totalSupply()).to.equal(0)
      await erc721DreizehnContract.connect(addr1).mint(addr1.address)
      expect(await erc721DreizehnContract.totalSupply()).to.equal(1)
    })

    it('mint event emit', async function () {
      await expect(erc721DreizehnContract.mint(addr2.address))
        .to.emit(erc721DreizehnContract, 'Mint')
        .withArgs(owner.address, addr2.address, tokenID)
    })

    it('burn success', async function () {
      await erc721DreizehnContract.mint(owner.address)
      expect(await erc721DreizehnContract.totalSupply()).to.equal(1)
      await erc721DreizehnContract.burn(tokenID)
      expect(await erc721DreizehnContract.totalSupply()).to.equal(0)
    })

    it('burn is onlyOwner', async function () {
      await erc721DreizehnContract.mint(owner.address)
      expect(await erc721DreizehnContract.totalSupply()).to.equal(1)
      await expect(erc721DreizehnContract.connect(addr1).burn(addr1.address)).to.be.reverted
      expect(await erc721DreizehnContract.totalSupply()).to.equal(1)
    })

    it('tokenByIndex success', async function () {
      await erc721DreizehnContract.mint(owner.address)
      await erc721DreizehnContract.mint(owner.address)
      expect(await erc721DreizehnContract.tokenByIndex(0)).to.equal(0)
      expect(await erc721DreizehnContract.tokenByIndex(1)).to.equal(1)
      await expect(erc721DreizehnContract.tokenByIndex(2)).to.be.reverted
    })

    it('tokenOfOwnerByIndex success', async function () {
      await erc721DreizehnContract.mint(owner.address)
      await erc721DreizehnContract.mint(owner.address)
      await erc721DreizehnContract.mint(addr1.address)
      expect(await erc721DreizehnContract.tokenOfOwnerByIndex(owner.address, 0)).to.equal(0)
      expect(await erc721DreizehnContract.tokenOfOwnerByIndex(owner.address, 1)).to.equal(1)
      await expect(erc721DreizehnContract.tokenOfOwnerByIndex(owner.address, 2)).to.be.reverted
      expect(await erc721DreizehnContract.tokenOfOwnerByIndex(addr1.address, 0)).to.equal(2)
      await expect(erc721DreizehnContract.tokenOfOwnerByIndex(addr1.address, 1)).to.be.reverted
    })

    it('tokenURI success', async function () {
      await erc721DreizehnContract.mint(owner.address)
      expect(await erc721DreizehnContract.tokenURI(tokenID)).to.equal('http://example.com/0.json')
    })

    it('setUriPrefix success', async function () {
      await erc721DreizehnContract.mint(owner.address)
      await erc721DreizehnContract.setUriPrefix('http://example.com/')
      expect(await erc721DreizehnContract.tokenURI(tokenID)).to.equal('http://example.com/0.json')
    })

    it('setUriPrefix is onlyOperator', async function () {
      await erc721DreizehnContract.mint(owner.address)
      expect(await erc721DreizehnContract.tokenURI(tokenID)).to.equal('http://example.com/0.json')
      await expect(erc721DreizehnContract.connect(addr1).setUriPrefix('http://example.com/')).to.be.reverted
      expect(await erc721DreizehnContract.tokenURI(tokenID)).to.equal('http://example.com/0.json')
    })

    it('operator can setUriPrefix', async function () {
      await erc721DreizehnContract.mint(owner.address)
      await roleManagerStoreContract.setOperator(addr1.address)
      expect(await erc721DreizehnContract.tokenURI(tokenID)).to.equal('http://example.com/0.json')
      await expect(erc721DreizehnContract.connect(addr1).setUriPrefix('http://example.com/asset/')).not.to.be.reverted
      expect(await erc721DreizehnContract.tokenURI(tokenID)).to.equal('http://example.com/asset/0.json')
    })

    it('setUriSuffix success', async function () {
      await erc721DreizehnContract.mint(owner.address)
      await erc721DreizehnContract.setUriSuffix('')
      expect(await erc721DreizehnContract.tokenURI(tokenID)).to.equal('http://example.com/0')
    })

    it('setUriSuffix is onlyOparator', async function () {
      await erc721DreizehnContract.mint(owner.address)
      expect(await erc721DreizehnContract.tokenURI(tokenID)).to.equal('http://example.com/0.json')
      await expect(erc721DreizehnContract.connect(addr1).setUriSuffix('')).to.be.reverted
      expect(await erc721DreizehnContract.tokenURI(tokenID)).to.equal('http://example.com/0.json')
    })

    it('operator can setUriSuffix', async function () {
      await erc721DreizehnContract.mint(owner.address)
      await roleManagerStoreContract.setOperator(addr1.address)
      expect(await erc721DreizehnContract.tokenURI(tokenID)).to.equal('http://example.com/0.json')
      await expect(erc721DreizehnContract.connect(addr1).setUriSuffix('')).not.to.be.reverted
      expect(await erc721DreizehnContract.tokenURI(tokenID)).to.equal('http://example.com/0')
    })

    it('operator can enableRestrictedTransfer', async function () {
      expect(await erc721DreizehnContract.restrictedTransferEnabled()).to.equal(false)
      await erc721DreizehnContract.connect(owner).enableRestrictedTransfer()
      expect(await erc721DreizehnContract.restrictedTransferEnabled()).to.equal(true)
    })

    it('addr1 can not enableRestrictedTransfer', async function () {
      await expect(erc721DreizehnContract.connect(addr1).enableRestrictedTransfer()).to.be.reverted
    })

    it('operator can disableRestrictedTransfer', async function () {
      await erc721DreizehnContract.connect(owner).enableRestrictedTransfer()
      expect(await erc721DreizehnContract.restrictedTransferEnabled()).to.equal(true)
      await erc721DreizehnContract.connect(owner).disableRestrictedTransfer()
      expect(await erc721DreizehnContract.restrictedTransferEnabled()).to.equal(false)
    })

    it('addr1 can not disableRestrictedTransfer', async function () {
      await expect(erc721DreizehnContract.connect(addr1).disableRestrictedTransfer()).to.be.reverted
    })

    it('Transfer success', async function () {
      await erc721DreizehnContract.mint(owner.address)
      expect(await erc721DreizehnContract.balanceOf(owner.address)).to.equal(1)
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(0)
      await erc721DreizehnContract.transferFrom(owner.address, addr1.address, tokenID)
      expect(await erc721DreizehnContract.balanceOf(owner.address)).to.equal(0)
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(1)
    })

    it('Transfer failed: token is not owned', async function () {
      await erc721DreizehnContract.mint(addr1.address)
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(1)
      expect(await erc721DreizehnContract.balanceOf(addr2.address)).to.equal(0)
      await expect(erc721DreizehnContract.transferFrom(addr1.address, addr2.address, tokenID)).to.be.reverted
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(1)
      expect(await erc721DreizehnContract.balanceOf(addr2.address)).to.equal(0)
    })

    it('Transfer success: restrictedTransferEnabled is true and token manager', async function () {
      await erc721DreizehnContract.enableRestrictedTransfer()
      await erc721DreizehnContract.connect(owner).mint(owner.address)
      expect(await erc721DreizehnContract.balanceOf(owner.address)).to.equal(1)
      expect(await erc721DreizehnContract.balanceOf(addr2.address)).to.equal(0)
      await erc721DreizehnContract.connect(owner).transferFrom(owner.address, addr2.address, tokenID)
      expect(await erc721DreizehnContract.balanceOf(owner.address)).to.equal(0)
      expect(await erc721DreizehnContract.balanceOf(addr2.address)).to.equal(1)
    })

    it('Transfer failed: restrictedTransferEnabled is true and not token manager', async function () {
      await erc721DreizehnContract.enableRestrictedTransfer()
      await erc721DreizehnContract.connect(owner).mint(addr1.address)
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(1)
      expect(await erc721DreizehnContract.balanceOf(addr2.address)).to.equal(0)
      await expect(erc721DreizehnContract.connect(addr1).transferFrom(addr1.address, addr2.address, tokenID)).to.be
        .reverted
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(1)
      expect(await erc721DreizehnContract.balanceOf(addr2.address)).to.equal(0)
    })

    it('approve success', async function () {
      await erc721DreizehnContract.mint(addr1.address)
      expect(await erc721DreizehnContract.getApproved(tokenID)).to.not.equal(owner.address)
      await erc721DreizehnContract.connect(addr1).approve(owner.address, tokenID)
      expect(await erc721DreizehnContract.getApproved(tokenID)).to.equal(owner.address)

      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(1)
      expect(await erc721DreizehnContract.balanceOf(addr2.address)).to.equal(0)
      await erc721DreizehnContract.transferFrom(addr1.address, addr2.address, tokenID)
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(0)
      expect(await erc721DreizehnContract.balanceOf(addr2.address)).to.equal(1)
    })

    it('approve failed: token is not owned', async function () {
      await erc721DreizehnContract.mint(addr2.address)
      expect(await erc721DreizehnContract.getApproved(tokenID)).to.not.equal(owner.address)
      await expect(erc721DreizehnContract.connect(addr1).approve(owner.address, tokenID)).to.be.reverted
      expect(await erc721DreizehnContract.getApproved(tokenID)).to.not.equal(owner.address)
    })

    it('setApprovalForAll success', async function () {
      await erc721DreizehnContract.mint(addr1.address)
      expect(await erc721DreizehnContract.isApprovedForAll(addr1.address, owner.address)).to.equal(false)
      await erc721DreizehnContract.connect(addr1).setApprovalForAll(owner.address, true)
      expect(await erc721DreizehnContract.isApprovedForAll(addr1.address, owner.address)).to.equal(true)

      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(1)
      expect(await erc721DreizehnContract.balanceOf(addr2.address)).to.equal(0)
      await erc721DreizehnContract.transferFrom(addr1.address, addr2.address, tokenID)
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(0)
      expect(await erc721DreizehnContract.balanceOf(addr2.address)).to.equal(1)
    })

    it('permit should be with valid deadline', async function () {
      await erc721DreizehnContract.mint(owner.address)
      const nowUnix = BigNumber.from(Math.floor(new Date().setHours(new Date().getHours()) / 1000))
      const nonce = BigNumber.from(new Date().getTime())
      const data = buildData(
        chainId,
        erc721DreizehnContract.address,
        await erc721DreizehnContract.name(),
        '1',
        owner.address,
        addr1.address,
        tokenID,
        nonce,
        nowUnix
      )
      const signature = await owner._signTypedData(data.domain, data.types, data.message)
      const { v, r, s } = fromRpcSig(signature)
      await expect(
        erc721DreizehnContract.connect(owner).latePermit(owner.address, addr1.address, tokenID, nonce, nowUnix, v, r, s)
      ).to.be.revertedWith('ERC721LatePermit: expired deadline')
    })

    it('permit is executed by only owner', async function () {
      await erc721DreizehnContract.mint(owner.address)
      const tomorrowUnix = BigNumber.from(Math.floor(new Date().setHours(new Date().getHours() + 24) / 1000))
      const nonce = BigNumber.from(new Date().getTime())
      const data = buildData(
        chainId,
        erc721DreizehnContract.address,
        await erc721DreizehnContract.name(),
        '1',
        owner.address,
        addr1.address,
        tokenID,
        nonce,
        tomorrowUnix
      )
      const signature = await owner._signTypedData(data.domain, data.types, data.message)
      const { v, r, s } = fromRpcSig(signature)
      await expect(
        erc721DreizehnContract
          .connect(owner)
          .latePermit(addr1.address, addr2.address, tokenID, nonce, tomorrowUnix, v, r, s)
      ).to.be.revertedWith('ERC721LatePermit: not owner')
    })

    it('permit should be with valid signature', async function () {
      await erc721DreizehnContract.mint(owner.address)
      const tomorrowUnix = BigNumber.from(Math.floor(new Date().setHours(new Date().getHours() + 24) / 1000))
      const nonce = BigNumber.from(new Date().getTime())
      const data = buildData(
        chainId,
        erc721DreizehnContract.address,
        await erc721DreizehnContract.name(),
        '1',
        addr1.address,
        addr2.address,
        tokenID,
        nonce,
        tomorrowUnix
      )
      const signature = await owner._signTypedData(data.domain, data.types, data.message)
      const { v, r, s } = fromRpcSig(signature)
      await expect(
        erc721DreizehnContract
          .connect(owner)
          .latePermit(owner.address, addr1.address, tokenID, nonce, tomorrowUnix, v, r, s)
      ).to.be.revertedWith('ERC721LatePermit: invalid signature')
    })

    it('permit success', async function () {
      await erc721DreizehnContract.mint(owner.address)
      const tomorrowUnix = BigNumber.from(Math.floor(new Date().setHours(new Date().getHours() + 24) / 1000))
      const nonce = BigNumber.from(new Date().getTime())
      const data = buildData(
        chainId,
        erc721DreizehnContract.address,
        await erc721DreizehnContract.name(),
        '1',
        owner.address,
        addr1.address,
        tokenID,
        nonce,
        tomorrowUnix
      )
      const signature = await owner._signTypedData(data.domain, data.types, data.message)
      const { v, r, s } = fromRpcSig(signature)
      expect(
        await erc721DreizehnContract
          .connect(owner)
          .latePermit(owner.address, addr1.address, tokenID, nonce, tomorrowUnix, v, r, s)
      )
        .to.emit(erc721DreizehnContract, 'Approval')
        .withArgs(owner.address, addr1.address, tokenID)
      expect(await erc721DreizehnContract.getApproved(tokenID)).to.equal(addr1.address)
      await erc721DreizehnContract
        .connect(owner)
        ['safeTransferFrom(address,address,uint256)'](owner.address, addr1.address, tokenID)
      expect(await erc721DreizehnContract.connect(addr1).ownerOf(tokenID)).to.equal(addr1.address)
    })

    it('should be with valid nonce', async function () {
      await erc721DreizehnContract.mint(owner.address)
      const tomorrowUnix = BigNumber.from(Math.floor(new Date().setHours(new Date().getHours() + 24) / 1000))
      const nonce = BigNumber.from(new Date().getTime())
      const data = buildData(
        chainId,
        erc721DreizehnContract.address,
        await erc721DreizehnContract.name(),
        '1',
        owner.address,
        addr1.address,
        tokenID,
        nonce,
        tomorrowUnix
      )
      const signature = await owner._signTypedData(data.domain, data.types, data.message)
      const { v, r, s } = fromRpcSig(signature)
      await expect(
        erc721DreizehnContract
          .connect(owner)
          .latePermit(owner.address, addr1.address, tokenID, nonce.add(1), tomorrowUnix, v, r, s)
      ).to.be.revertedWith('ERC721LatePermit: invalid signature')
    })

    it('should be with unique nonce', async function () {
      await erc721DreizehnContract.mint(owner.address)
      const tomorrowUnix = BigNumber.from(Math.floor(new Date().setHours(new Date().getHours() + 24) / 1000))
      const nonce = BigNumber.from(new Date().getTime())
      const data = buildData(
        chainId,
        erc721DreizehnContract.address,
        await erc721DreizehnContract.name(),
        '1',
        owner.address,
        addr1.address,
        tokenID,
        nonce,
        tomorrowUnix
      )
      const signature = await owner._signTypedData(data.domain, data.types, data.message)
      const { v, r, s } = fromRpcSig(signature)
      expect(
        await erc721DreizehnContract
          .connect(owner)
          .latePermit(owner.address, addr1.address, tokenID, nonce, tomorrowUnix, v, r, s)
      )
        .to.emit(erc721DreizehnContract, 'Approval')
        .withArgs(owner.address, addr1.address, tokenID)
      expect(await erc721DreizehnContract.getApproved(tokenID)).to.equal(addr1.address)

      const data2 = buildData(
        chainId,
        erc721DreizehnContract.address,
        await erc721DreizehnContract.name(),
        '1',
        owner.address,
        addr1.address,
        tokenID,
        nonce,
        tomorrowUnix
      )
      const signature2 = await owner._signTypedData(data2.domain, data2.types, data2.message)
      const { v: v2, r: r2, s: s2 } = fromRpcSig(signature2)
      await expect(
        erc721DreizehnContract
          .connect(owner)
          .latePermit(owner.address, addr1.address, tokenID, nonce, tomorrowUnix, v2, r2, s2)
      ).to.be.revertedWith('ERC721LatePermit: invalid nonce')
    })
  })

  describe('marketForOffchainPaymentContract', function () {
    it('transferForTokenManagertransferForTokenManager success', async function () {
      await erc721DreizehnContract.enableRestrictedTransfer()
      await erc721DreizehnContract.mint(owner.address)
      // spender
      await roleManagerStoreContract.setTokenManager(addr2.address)
      await roleManagerStoreContract.setTokenManager(marketForOffchainPaymentContract.address)
      expect(await erc721DreizehnContract.balanceOf(owner.address)).to.equal(1)
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(0)

      const tomorrowUnix = BigNumber.from(Math.floor(new Date().setHours(new Date().getHours() + 24) / 1000))
      const nonce = BigNumber.from(new Date().getTime())

      const data = buildData(
        chainId,
        erc721DreizehnContract.address,
        await erc721DreizehnContract.name(),
        '1',
        owner.address,
        // spenderはaddr2だが、permitを呼び出してるのはcontract
        marketForOffchainPaymentContract.address,
        tokenID,
        nonce,
        tomorrowUnix
      )
      const signature = await owner._signTypedData(data.domain, data.types, data.message)

      const { v, r, s } = fromRpcSig(signature)

      await marketForOffchainPaymentContract.connect(addr2).transferForTokenManager(
        erc721DreizehnContract.address,
        owner.address,
        // 送り先
        addr1.address,
        tokenID,
        nonce,
        tomorrowUnix,
        v,
        r,
        s
      )
      expect(await erc721DreizehnContract.balanceOf(owner.address)).to.equal(0)
      expect(await erc721DreizehnContract.balanceOf(addr1.address)).to.equal(1)
    })
  })
})
