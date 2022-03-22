import axios from 'axios'
import React, { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box, Heading, Stack, Text, Button, Flex } from '@chakra-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faHouse } from '@fortawesome/free-solid-svg-icons'

interface Props {
  statusCode: number
  req?: any
  err?: any
}

const IndexPageComponent: FC<Props> = (pageProps) => {
  const { statusCode, err, req } = pageProps
  const router = useRouter()
  console.log('error', pageProps)
  const heightOfNavbar: string = '74px'
  const containerPadding: string = '1rem'
  const error = err ?? new Error(`${statusCode}: Impossible de trouver la page demandée`)
  /*let errorSent = false
  if (!errorSent) axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/errors`, {
    data: {
      title: error.name,
      code: statusCode,
      full_error: error.toString(),
      path: router.asPath,
      triggered_by_ip: '',
    }
  }).then(() => errorSent = true)*/
  const returnToHome = () => {
    return (
      <Box>
        <Link href="/">
          <Button variantColor="blue" variant="solid">
            <FontAwesomeIcon icon={faHouse} style={{ marginRight: '15px', color: 'rgb(20 110 190)' }} />
            Retourner à la page d'accueil
          </Button>
        </Link>
      </Box>
    )
  }
  
  return (
    <Stack>
      <Flex
        minH={`calc(100vh - ${heightOfNavbar} - ${containerPadding}*2)`}
        justifyContent="center"
        alignItems="center"
      >
        <Stack spacing={4} maxW="xl" mx="auto">
          <FontAwesomeIcon icon={faTriangleExclamation} size="3x" color="orange" />
          <Heading textAlign="center">Oops, une erreur est survenue...</Heading>
          <Text fontSize="xl" lineHeight="tall" textAlign="center">
            { statusCode
              ? `Le serveur a retourné un code d'erreur ${statusCode}`
              : 'Une erreur est survenue avec le client' }
          </Text>
          <Box>
            <Stack isInline={true} align="center" justifyContent="center">
              { returnToHome() }
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  )
}

export default IndexPageComponent
