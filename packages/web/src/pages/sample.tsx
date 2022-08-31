import React from 'react'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useContent } from 'src/libs/hooks/useTodoList'
import { Web3BoilerSDK } from '@web3-boiler/contract'

interface ContentProps {
  contract: ethers.Contract
}

const Content = ({ contract }: ContentProps) => {
  const { taskCount } = useContent(contract)
  return <p>{`taskCount ... ${taskCount}`}</p>
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
    </>
  )
}

export default Sample
