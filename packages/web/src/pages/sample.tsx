import React from 'react'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useContent } from 'src/libs/hooks/useTodoList'
import { Web3BoilerSDK } from '@web3-boiler/contract'
import { useMetaMask } from 'src/libs/hooks/useMetaMask'

interface ContentProps {
  contract: ethers.Contract
}

const Content = ({ contract }: ContentProps) => {
  const { taskCount } = useContent(contract)
  return <p>{`taskCount ... ${taskCount}`}</p>
}

const ContentConnectWallet = ({ contract }: ContentProps) => {
  useContent(contract)
  const { connectWalletHandler, account } = useMetaMask()
  return (
    <div>
      <div>Hello Contract!</div>
      <button onClick={connectWalletHandler}>Connect Wallet</button>
      <div>
        <h3>Address: {account}</h3>
      </div>
    </div>
  )
}

const Sample: NextPage = () => {
  return (
    <>
      <Head>
        <title>Web3 Boiler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>sample</h1>
      <Content contract={Web3BoilerSDK.TodoList.contract} />
      <ContentConnectWallet contract={Web3BoilerSDK.Greeter.contract} />
    </>
  )
}

export default Sample
