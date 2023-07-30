import { PublicCreateSignatureRequestBody } from '@nft-market/http-client'
import { useState } from 'react'
import { api } from 'src/libs/http'

export const useCreateSignature = () => {
  const [isLoading, setIsLoading] = useState(false)
  const createSignature = async (body: PublicCreateSignatureRequestBody) => {
    setIsLoading(true)
    await api
      .signatureControllerCreate(
        { publicCreateSignatureRequestBody: body },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .catch(e => {
        console.error(e)
      })
      .finally(() => setIsLoading(false))
  }

  return { createSignature, isLoading }
}
