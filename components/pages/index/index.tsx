import React, { useState } from 'react'
import {
  Badge,
  Button,
  ButtonGroup,
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/core'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const IndexPageComponent = ({
  visitors,
  ytClicks,
  twitterClicks,
  twitchClicks,
  ytSubscribers,
  twitterSubscribers,
  twitchSubscribers,
  locale,
  page,
}) => {
  const texts = page.data
  let newVisitors = visitors
  let ytClicked = false
  let twitterClicked = false
  let twitchClicked = false
  
  const { data: session, status } = useSession()
  const heightOfNavbar: string = '74px'
  const containerPadding: string = '1rem'
  const { colorMode } = useColorMode()
  const color = { light: 'gray.800', dark: 'gray.100' }
  
  const signInButtonNode = () => {
    if (session) { return false }
    
    return (
      <Box>
        <Link href="/api/auth/signin">
          <Button
            onClick={ (e) => {
              e.preventDefault()
              signIn()
            } }
          >
            Créer un compte
          </Button>
        </Link>
      </Box>
    )
  }
  const signOutButtonNode = () => {
    if (!session) { return false }
    
    return (
      <Box>
        <Link href="/api/auth/signout">
          <Button
            onClick={ (e) => {
              e.preventDefault()
              signOut()
            } }
          >
            Déconnexion
          </Button>
        </Link>
      </Box>
    )
  }
  
  const saveYtClick = (): void => {
    if (!ytClicked) {
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`).then(statsResponse => {
        let clicks = ytClicks
        const { data } = statsResponse
        const { attributes } = data.data
        if (attributes.youtube_clicks !== clicks) clicks = attributes.youtube_clicks
        axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`, {
          data: {
            youtube_clicks: clicks + 1,
          }
        }).then(() => ytClicked = true)
      })
    }
    
    return undefined
  }
  const saveTwitterClick = () => {
    if (!twitterClicked) {
      axios.get(`${ process.env.NEXT_PUBLIC_STRAPI_URL }/stat`).then(statsResponse => {
        let clicks = twitterClicks
        const {data} = statsResponse
        const {attributes} = data.data
        if (attributes.twitter_clicks !== clicks) clicks = attributes.twitter_clicks
        axios.put(`${ process.env.NEXT_PUBLIC_STRAPI_URL }/stat`, {
          data: {
            twitter_clicks: clicks + 1,
          }
        }).then(() => ytClicked = true)
      })
      return null
    }
  }
  const saveTwitchClick = () => {
    if (!twitchClicked) {
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`).then(statsResponse => {
        let clicks = twitchClicks
        const { data } = statsResponse
        const { attributes } = data.data
        if (attributes.twitch_clicks !== clicks) clicks = attributes.twitch_clicks
        axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`, {
          data: {
            twitch_clicks: clicks + 1,
          }
        }).then(() => ytClicked = true)
      })
    }
    
    return null
  }
  
  return (
    <Stack>
      <Flex
        justifyContent="center"
        alignItems="center"
        color={color[colorMode]}
        padding={containerPadding}
      >
        <Stack maxW="xl" mx="auto">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image
              rounded="full"
              size="150px"
              src="/images/logo.png"
              alt="Universe * Travel"
            />
          </div>
          
          <Box w={[350, 500, 590]}>
            <Heading textAlign="center" mt="1rem">Universe * Travel</Heading>
            <Text fontSize="xl" lineHeight="tall" textAlign="center" mt="1rem">
              { texts.heading } 🚀✨
              <br/>
              <Button variantColor="orange" variant="outline" mt="1.5rem">
                <FontAwesomeIcon icon={faScrewdriverWrench} style={{ marginRight: '15px', color: '#d77706' }} />
                { texts.buttons.buildingWebsite }
                <Spinner color="orange.500" style={{ marginLeft: '5px' }} />
              </Button>
            </Text>
            <Text mt={4}>
              <i>Nous recherchons un développeur freelance front-end (next.js), contactez nous via discord !</i>
            </Text>
            <Divider width="75%" mt="15px" ml="auto" mr="auto"/>
            <Box>
              <Heading textAlign="center" as="h3" size="lg">{ texts.socials.followUsOnSocialNetworks }</Heading>
              <Box
                className="container"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ButtonGroup spacing={4} className="col-md-12"
                             style={{
                               marginTop: '2rem',
                               display: 'flex',
                               justifyContent: 'center',
                             }}
                >
                  <a href="https://www.youtube.com/channel/UCuMuwmYqppEJ8imtOeAtV9Q" target="_blank"
                     onClick={ saveYtClick }
                  >
                    <Button variantColor="red" variant="outline">
                      <FontAwesomeIcon icon={faYoutube} style={{ marginRight: '10px', color: '#FF0000' }} />
                      Youtube
                      <Badge variantColor="red" ml="3px">{ ytSubscribers }</Badge>
                    </Button>
                  </a>
                  <a href="https://twitter.com/42_UTravel" target="_blank" style={{ marginLeft: '5px'}}
                     onClick={ saveTwitterClick }
                  >
                    <Button variantColor="blue" variant="outline">
                      <FontAwesomeIcon icon={faTwitter} style={{ marginRight: '10px', color: '#1DA1F2' }} />
                      Twitter
                      <Badge variantColor="blue" ml="3px">{ twitterSubscribers }</Badge>
                    </Button>
                  </a>
                  <a href="https://www.twitch.tv/universe_travel" target="_blank" style={{ marginLeft: '5px'}}
                     onClick={ saveTwitchClick }
                  >
                    <Button variantColor="purple" variant="outline">
                      <FontAwesomeIcon icon={faTwitch} style={{ marginRight: '15px', color: '#6441A4' }} />
                      Twitch
                      <Badge variantColor="purple" ml="3px">{ twitchSubscribers }</Badge>
                    </Button>
                  </a>
                </ButtonGroup>
              </Box>
            </Box>
            {/* <Box>
              <Stack isInline align="center" justifyContent="center">
                { signInButtonNode() }
                { signOutButtonNode() }
              </Stack>
            </Box>*/}
          </Box>
        </Stack>
      </Flex>
    </Stack>
  )
}

export default IndexPageComponent
