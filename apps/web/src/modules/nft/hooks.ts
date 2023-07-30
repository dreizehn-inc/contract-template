import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface BearState {
  nfts: { id: string; name: string; description: string; price: string; src: string }[]
}

export const useNFTStore = create<BearState>()(
  devtools(() => ({
    nfts: [
      {
        id: '1',
        src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
        description: `This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.`,
        name: 'Living room Sofa',
        price: '450'
      }
    ]
  }))
)
