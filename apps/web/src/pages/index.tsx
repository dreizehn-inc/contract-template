import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
  Grid,
  GridItem,
  Box,
  Input
} from '@chakra-ui/react'
import { Web3Button } from '@web3modal/react'
import { useState } from 'react'
import { useBearStore } from 'src/modules/bear/hooks'
import { useGreetContract, useSetGreetingContract } from 'src/modules/greeter/hooks'
import { useSignPermit } from 'src/modules/market/hooks'
import { useNFTStore } from 'src/modules/nft/hooks'
import { useCreateSignature } from 'src/modules/signature/hooks'
import { useCreateUser } from 'src/modules/user/hooks'
import { useAccount } from 'wagmi'

import type { NextPage } from 'next'

const CreateUserButton = () => {
  const { isConnected, address } = useAccount()
  const { createUser } = useCreateUser()
  const handleClick = async () => {
    if (isConnected && address) {
      await createUser({ address, name: 'test', email: 'test@email.com', password: 'password' })
    }
  }
  return (
    <Button disabled={!isConnected} onClick={handleClick}>
      Create User!
    </Button>
  )
}

const SubmitButton = (props: { greeting: string }) => {
  const { setGreeting } = useSetGreetingContract(props.greeting)
  return (
    <Button disabled={!setGreeting} onClick={() => setGreeting?.()} sx={{ my: '8px' }}>
      Submit!
    </Button>
  )
}

const ExhibitButton = ({ tokenId }: { tokenId: string | number }) => {
  const { signPermit } = useSignPermit()
  const { isConnected, address } = useAccount()
  const { createSignature } = useCreateSignature()
  const handleClick = async () => {
    if (isConnected && address) {
      const tokenIdNum = Number(tokenId)
      if (!tokenIdNum) {
        return alert('TokenID must be Number')
      }
      const { data, chainId, deadline, nonce } = await signPermit(Number(tokenId))
      if (data) {
        await createSignature({ sign: data, chainId, tokenId: tokenIdNum, deadline, address, nonce })
      }
    }
  }
  return (
    <Button disabled={!isConnected} onClick={handleClick} sx={{ mt: '8px' }}>
      出品する
    </Button>
  )
}

const Index: NextPage = () => {
  const { nfts } = useNFTStore()
  const { bears, increase } = useBearStore()
  const { greet, isSuccess } = useGreetContract()

  const [value, setValue] = useState('')

  return (
    <Box p="24px">
      <Box sx={{ display: 'flex', alignItems: 'center', py: '8px' }}>
        <Text variant="h1" sx={{ flexGrow: '1' }}>
          NFT Market Sample
        </Text>
        <Web3Button />
      </Box>
      <Divider />
      <Box my="16px">
        <Text variant="h2" my="8px">
          🚀 所持しているNFT
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {nfts.map(nft => (
            <GridItem w="100%" key={nft.id}>
              <Card>
                <CardBody>
                  <Image src={nft.src} alt="Green double couch with wooden legs" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{nft.name}</Heading>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <ExhibitButton tokenId={nft.id} />
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>

      <Divider />
      <Box my="16px">
        <Text variant="h2" my="8px">
          🖼️ 出品されているNFT
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {nfts.map(nft => (
            <GridItem w="100%" key={nft.id}>
              <Card>
                <CardBody>
                  <Image src={nft.src} alt="Green double couch with wooden legs" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{nft.name}</Heading>
                    <Text></Text>
                    <Text color="blue.600" fontSize="2xl">
                      ${nft.price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      購入する
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Box>

      <Divider />
      <Box my="16px">
        <Text variant="h2" my="8px">
          Zustand Playground
        </Text>

        <Box>
          <Text variant="h3" my="8px">
            bears: {bears}
          </Text>
          <Button onClick={() => increase(1)}>increase</Button>
        </Box>
      </Box>

      <Divider />
      <Box my="16px" sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Text variant="h2" my="8px">
          Contract Playground
        </Text>

        <Box>
          <Text variant="h4" my="8px">
            Walletを接続した状態で以下のボタンを押すと、DBにユーザーが作成されます。
          </Text>
          <CreateUserButton />
        </Box>

        <Box>
          <Box>{isSuccess && <Text my="8px">greet: {greet}</Text>}</Box>
          <Box>
            <Input
              placeholder="Set your greeting..."
              value={value}
              onChange={e => {
                setValue(e.target.value)
              }}
            />
          </Box>
          <SubmitButton greeting={value} />
        </Box>
      </Box>
    </Box>
  )
}

export default Index
