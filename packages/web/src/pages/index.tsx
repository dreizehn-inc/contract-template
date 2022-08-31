import React from 'react'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useGreeter } from 'src/libs/hooks/useGreeter'
import { Web3BoilerSDK } from '@web3-boiler/contract'

const contractAddress = process.env.NEXT_PUBLIC_GREETER_CONTRACT_ADDRESS || ''

interface ContentProps {
  contract: ethers.Contract
}

const Content = ({ contract }: ContentProps) => {
  const { greeting } = useGreeter(contract)
  return <p>{`Greeting ... ${greeting}`}</p>
}

const Sample: NextPage = () => {
  return (
    <>
      <Head>
        <title>Web3 Boiler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>sample</h1>
      <Content contract={Web3BoilerSDK.Greeter(contractAddress).contract} />
    </>
  )
}

export default Sample
