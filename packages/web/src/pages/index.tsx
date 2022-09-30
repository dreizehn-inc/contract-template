import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useGreeter } from 'src/libs/hooks/useGreeter'
import { useNFT } from 'src/libs/hooks/useNFT'

interface ContentProps {
  address: string
  signer: ethers.providers.JsonRpcSigner
}

const Content = (props: ContentProps) => {
  const [text, setText] = useState('')

  const { message, fetchMessage, setGreeting } = useGreeter(props.signer)
  const { mint, uri, fetchTokenURI } = useNFT(props.signer)

  const handleFetchMessage = async () => {
    await fetchMessage()
  }

  const handleFetchTokenURI = async () => {
    await fetchTokenURI()
  }

  const handleChange = (event: ChangeEvent) => {
    // @ts-ignore
    setText(event.target.value)
  }
  const handleSetGreeting = async (e: FormEvent) => {
    e.preventDefault()
    const tx = await setGreeting(text)
    const receipt = await tx.wait()
    // eslint-disable-next-line no-console
    console.log(receipt)
  }
  const handleRandomMint = async () => {
    const tx = await mint('https://www.google.com')
    const receipt = await tx.wait()
    // eslint-disable-next-line no-console
    console.log(receipt)
  }
  return (
    <div style={{ paddingTop: '12px' }}>
      <div>Address: {props.address}</div>
      <button onClick={handleFetchMessage}>fetch message</button>
      <p>{`Greeting ... ${message}`}</p>
      <button onClick={handleFetchTokenURI}>fetch token uri</button>
      <button onClick={handleRandomMint}>mint</button>
      <p>{`TokenURI ... ${uri}`}</p>

      <form onSubmit={handleSetGreeting}>
        <div>
          <label>Enter New Greet: </label>
          <input type="text" required onChange={handleChange} />
        </div>
        <div>
          <input type="submit" value="Update!" />
        </div>
      </form>
    </div>
  )
}

const Sample: NextPage = () => {
  const [address, setAddress] = useState('')
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>()
  const handleConnect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send('eth_requestAccounts', [])
    setAddress(accounts)
    setSigner(provider.getSigner())
  }
  return (
    <>
      <Head>
        <title>Web3 Boiler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Web3 Boiler</h1>
      <button onClick={handleConnect}>connect</button>
      {signer && <Content signer={signer} address={address} />}
    </>
  )
}

export default Sample
