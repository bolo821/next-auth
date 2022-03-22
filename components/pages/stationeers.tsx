import React from 'react'
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
  Tooltip,
  useColorMode
} from '@chakra-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faEye, faStar } from '@fortawesome/free-solid-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'
import axios from 'axios'

const StationeersPageComponent = ({
  page,
  playersCount,
  online,
  accessibility,
  stationeersClicks,
  stationeersReviewsClicks,
}) => {
  const texts = page.data
  const containerMinWidth: string = '70rem'
  const containerPadding: string = '1rem'
  const { colorMode } = useColorMode()
  const bgColor = { light: 'white', dark: 'gray.800' }
  const color = { light: 'gray.800', dark: 'gray.100' }
  let gamePageClick = false
  let gameReviewClick = false
  let finalAccessibility = 'whitelist'
  let srvBtnColor = 'orange'
  let accBtnColor = 'orange'
  switch (accessibility) {
    case 'public':
      finalAccessibility = texts.buttons.public
      accBtnColor = 'green'
      break
    case 'whitelist':
      finalAccessibility = texts.buttons.whitelist
      break
    case 'private':
      finalAccessibility = texts.buttons.private
      accBtnColor = 'red'
      break
    default: {
      finalAccessibility = texts.buttons.whitelist
    }
  }
  let playersCountButton = texts.buttons.players.replace('%count%', playersCount ?? 0)
  let accessibilityButton = `${texts.buttons.accessibility} : <b>${finalAccessibility}</b>`
  const getServerStatus = () => {
    const statusText = online ? texts.buttons.online : texts.buttons.offline
    let btnColor = 'red'
    if (online) btnColor = 'green'
    
    return (
      <Button variantColor={btnColor}><b>{statusText}</b></Button>
    )
  }
  
  const getPlayersCount = () => (
    <Button variantColor="blue" mt="5px">
      <Text dangerouslySetInnerHTML={{ __html: playersCountButton }} />
    </Button>
  )
  
  const getAccessibility = () =>  {
    let tooltip = "Vous devez rejoindre notre serveur discord pour vous avoir accès au serveur ! Rejoignez nous dans le menu Discord !"
    if (accBtnColor === 'green') tooltip = "Rejoignez nous sur notre serveur discord pour avoir accès aux informations de connexion au serveur !"
  
    return (
      <Tooltip hasArrow={true} aria-label="Informations"
               placement="left" bg={ accBtnColor + ".400" }
               label={tooltip}
      >
        <Button variantColor={accBtnColor} mt="5px">
          <Text dangerouslySetInnerHTML={{ __html: accessibilityButton }} />
        </Button>
      </Tooltip>
    )
  }
  
  const saveGamePageClick = (): void => {
    if (!gamePageClick) {
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`).then(statsResponse => {
        let clicks = stationeersClicks
        const { data } = statsResponse
        const { attributes } = data.data
        if (attributes.stationeers_clicks !== clicks) clicks = attributes.stationeers_clicks
        axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`, {
          data: {
            stationeers_clicks: clicks + 1,
          }
        }).then(() => gamePageClick = true)
      })
    }
    
    return undefined
  }
  
  const saveGameReviewClick = (): void => {
    if (!gameReviewClick) {
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`).then(statsResponse => {
        let clicks = stationeersReviewsClicks
        const { data } = statsResponse
        const { attributes } = data.data
        if (attributes.stationeers_reviews_clicks !== clicks) clicks = attributes.stationeers_reviews_clicks
        axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`, {
          data: {
            stationeers_reviews_clicks: clicks + 1,
          }
        }).then(() => gamePageClick = true)
      })
    }
    
    return undefined
  }
  
  const visitGamePages = () => {
    return (
      <List>
        <ListItem>
          <a href="https://store.steampowered.com/app/544550/Stationeers/" target="_blank" onClick={saveGamePageClick}>
            <Button variantColor="blue" variant="outline">
              <FontAwesomeIcon icon={faEye} style={{ marginRight: '15px', color: '#0a84db' }} /> { texts.buttons.steamPage }
            </Button>
          </a>
        </ListItem>
        <ListItem>
          <a href="https://steamcommunity.com/app/544550/reviews/?browsefilter=toprated&snr=1_5_100010_&filterLanguage=french"
             target="_blank" onClick={saveGameReviewClick}
          >
            <Button variantColor="yellow" variant="outline" mt="5px">
              <FontAwesomeIcon icon={faStar} style={{ marginRight: '15px', color: '#ffd000' }} /> { texts.buttons.steamReviews }
            </Button>
          </a>
        </ListItem>
      </List>
    )
  }
  
  return (
    <Box
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      width={containerMinWidth}
      shadow="lg"
      rounded="lg"
      w={[350, 500, 750]}
      className="container-fluid p-3"
    >
      <Stack>
        <Flex
          justifyContent="center"
          alignItems="center"
          color={color[colorMode]}
          padding={containerPadding}
        >
          <Stack spacing={4} maxW="xl" mb="auto" mx="auto">
            <FontAwesomeIcon icon={faUserAstronaut} size="5x" color="#E2E8F0" />
            <Heading textAlign="center" mt="1rem">{texts.heading.title}</Heading>
            <Text fontSize="xl" lineHeight="tall" textAlign="center" dangerouslySetInnerHTML={{ __html: texts.heading.heading }} />
            <Divider width="90%" mb="auto" mx="auto" />
            <Heading textAlign="center" as="h4" size="md">{ texts.content.serverInformation }</Heading>
            <Box lineHeight="tall" textAlign="center">
              <List>
                <ListItem>{ getServerStatus() }</ListItem>
                <ListItem>{ getPlayersCount() }</ListItem>
                <ListItem>{ getAccessibility() }</ListItem>
              </List>
            </Box>
            <Divider width="50%" mb="auto" mx="auto" />
            <Heading textAlign="center" as="h4" size="md">{ texts.heading.videoIntro }</Heading>
            <Box w={[300, 500, 590]} style={{
              overflow: 'hidden',
              'padding-bottom': '56.25%',
              position: 'relative',
              height: 0,
            }}>
              <iframe style={{
                left: 0,
                top: 0,
                height: '100%',
                width: '100%',
                position: 'absolute'
              }}
                      width="560" height="315" src="https://www.youtube.com/embed/Z6EEEshHebc?autoplay=1&mute=1"
                      title="YouTube video player" frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen={true}/>
            </Box>
            <Text lineHeight="tall" textAlign="center" dangerouslySetInnerHTML={{ __html: texts.heading.preline }} />
            <Divider />
            <Box lineHeight="tall" textAlign="center">
              { visitGamePages() }
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  )
}

export default StationeersPageComponent
