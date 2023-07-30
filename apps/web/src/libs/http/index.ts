import { PublicServiceApi, Configuration } from '@nft-market/http-client'

if (typeof process.env.NEXT_PUBLIC_API_URL == 'undefined') {
  throw new Error('set env value: NEXT_PUBLIC_API_URL')
}

const config = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_URL
})
export const api = new PublicServiceApi(config)
