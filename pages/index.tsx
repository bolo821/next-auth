import {
  Button,
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faHouse } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import React, { useContext } from 'react'
import Head from 'next/head'
import Page from 'components/pages/index'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { getPage } from '../helpers/getPageHelper'
import getVisitorsCount from '../helpers/getVisitorsCount'
import type { Page as PageProps } from '../../'

interface Props {
  page: PageProps
  visitors: number
  ytClicks: number
  twitterClicks: number
  twitchClicks: number
  disboardClicks: number
  discordClassementClicks: number
  ytSubscribers: number
  twitterSubscribers: number
  twitchSubscribers: number
  path: string
}

const IndexPage: NextPage<Props> = (props) => {
  const { pages, locale } = props
  const page = getPage({ pages, locale, pathname: '/' })

  if (!page) {
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
      <Page>
        <Stack>
          <Flex
            justifyContent="center"
            alignItems="center"
          >
            <Stack spacing={4} maxW="xl" mx="auto">
              <FontAwesomeIcon icon={faTriangleExclamation} size="3x" color="orange" />
              <Heading textAlign="center">Oops, une erreur est survenue...</Heading>
              <Text fontSize="xl" lineHeight="tall" textAlign="center">
                Désolé, nous ne sommes pas parvenus à récupérer les informations de cette page. Veillez réessayer plus tard
              </Text>
              <Box>
                <Stack isInline={true} align="center" justifyContent="center">
                  { returnToHome() }
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Stack>
      </Page>
    )
  }
  const router = useRouter()
  const pageProps = {
    ...props, path: router.path, page: page.attributes,
  }
  return (
    <>
      <Head>
        <title>Universe * Travel | { page.attributes.title }</title>
      </Head>
      <Page { ...pageProps } />
    </>
  )
}

IndexPage.getInitialProps = async (ctx) => {
  const {  req } = ctx
  const configs = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`)
  
  const { data } = configs.data
  const { attributes } = data
  const {
    visitors,
    youtube_clicks: ytClicks,
    twitter_clicks: twitterClicks,
    twitch_clicks: twitchClicks,
    disboard_clicks: disboardClicks,
    discord_classement_clicks: discordClassementClicks,
    yt_subscribers: ytSubscribers,
    twitter_subscribers: twitterSubscribers,
    twitch_subscribers: twitchSubscribers
  } = attributes
  if (req && req.headers['x-real-ip']) console.log('new visitors')
  
  await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat?fields[0]=visitors`, {
    data: { visitors: visitors + 1 }
  }).catch(err => {
    console.log('error: ', err);
  })
  
  /*if (req && req.headers['x-real-ip'] !== process.env.DEV_IP) {
    await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`, {
      data: { visitors: visitors + 1 }
    })
  }*/
  
  getVisitorsCount(visitors +  1)
  
  return {
    visitors,
    ytClicks,
    twitterClicks,
    twitchClicks,
    disboardClicks,
    discordClassementClicks,
  }
}

export default IndexPage
