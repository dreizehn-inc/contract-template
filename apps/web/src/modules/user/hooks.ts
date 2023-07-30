import { PublicCreateUserRequestBody } from '@nft-market/http-client'
import { useState } from 'react'
import { api } from 'src/libs/http'

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const createUser = async (body: PublicCreateUserRequestBody) => {
    setIsLoading(true)
    await api
      .userControllerCreate({ publicCreateUserRequestBody: body }, { headers: { 'Content-Type': 'application/json' } })
      .catch(e => {
        console.error(e)
      })
      .finally(() => setIsLoading(false))
  }

  return { createUser, isLoading }
}
