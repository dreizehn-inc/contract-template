import { ChakraProvider } from '@chakra-ui/react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { WagmiConfig, configureChains, createClient } from 'wagmi'
import { mainnet, polygonMumbai, arbitrum } from 'wagmi/chains'

import type { AppProps } from 'next/app'

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID env variable')
}

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

// 2. Wagmi client
const local = {
  id: 31337,
  name: 'Localhost',
  network: 'local',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8545']
    },
    public: {
      http: ['http://localhost:8545']
    }
  },
  blockExplorers: {
    default: {
      name: 'Local Explorer',
      url: 'http://localhost:3000'
    }
  },
  contracts: {}
}

const chains = [local, mainnet, polygonMumbai, arbitrum]
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
export const ethereumClient = new EthereumClient(wagmiClient, chains)

const NextApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Head>
        <title>NFT Market Sample</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

const MyApp = (props: AppProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <>
      {isMounted && (
        <WagmiConfig client={wagmiClient}>
          <NextApp {...props} />
        </WagmiConfig>
      )}

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        chainImages={{
          137: '/images/chain_polygon.webp',
          80001: '/images/chain_polygon.webp'
        }}
      />
    </>
  )
}

export default MyApp
