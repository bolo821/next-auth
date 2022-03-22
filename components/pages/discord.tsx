import React from 'react'
import axios from 'axios'
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faLink, faStar, faListOl } from '@fortawesome/free-solid-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'

const DiscordPageComponent = ({ page, invitation, clicks, id, disboardClicks, discordClassementClicks, discordUsers }) => {
  const texts = page.data
  const containerMinWidth: string = '50rem'
  const containerPadding: string = '1rem'
  const { colorMode } = useColorMode()
  const bgColor = { light: 'white', dark: 'gray.800' }
  const color = { light: 'gray.800', dark: 'gray.100' }
  let disboardClicked = false
  let classementClicked = false
  
  const saveDiscordClick = () => axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/discord-invitations/${id}`).then(statsResponse => {
    const { data } = statsResponse
    const { attributes } = data.data
    let actualClicks = clicks
    if (attributes.clicks !== actualClicks) actualClicks = attributes.disboard_clicks
    axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/discord-invitations/${id}`, {
      data: {
        clicks: actualClicks + 1,
      }
    }).then(() => {
      axios.put(`${ process.env.NEXT_PUBLIC_STRAPI_URL }/stat`, {
        data: {
          disboard_clicks: actualClicks + 1,
        }
      }).then(() => disboardClicked = true)
    })
  })
  
  const saveDisboardClick = () => {
    if (!disboardClicked) {
      axios.get(`${ process.env.NEXT_PUBLIC_STRAPI_URL }/stat`).then(statsResponse => {
        let actualClicks = disboardClicks
        const { data } = statsResponse
        const { attributes } = data.data
        if (attributes.disboard_clicks !== actualClicks) actualClicks = attributes.disboard_clicks
        axios.put(`${ process.env.NEXT_PUBLIC_STRAPI_URL }/stat`, {
          data: {
            disboard_clicks: actualClicks + 1,
          }
        }).then(() => disboardClicked = true)
      })
      
      return null
    }
  }
  
  const saveClassementClick = () => {
    if (!classementClicked) {
      axios.get(`${ process.env.NEXT_PUBLIC_STRAPI_URL }/stat`).then(statsResponse => {
        let actualClicks = discordClassementClicks
        const { data } = statsResponse
        const { attributes } = data.data
        if (attributes.discord_classement_clicks !== actualClicks) actualClicks = attributes.discord_classement_clicks
        axios.put(`${ process.env.NEXT_PUBLIC_STRAPI_URL }/stat`, {
          data: {
            discord_classement_clicks: actualClicks + 1,
          }
        }).then(() => classementClicked = true)
      })
      
      return null
    }
  }
  
  const joinDiscordServer = () => {
    if (invitation) {
      return (
        <Box>
          <a href={invitation} target="_blank" onClick={saveDiscordClick}>
            <Button variantColor="teal" variant="outline">
              <FontAwesomeIcon icon={faDiscord} style={{ marginRight: '15px', color: '#7289DA' }} />
              { texts.buttons.discord }
              <Badge variantColor="blue" ml="3px">{ discordUsers }</Badge>
            </Button>
          </a>
        </Box>
      )
    } else {
      return (
        <Box>
          <b>{ texts.content.noDiscordInvit } 😕</b>
        </Box>
      )
    }
    
  }
  
  const rateUsOnDisboard = () => {
    return (
      <Box>
        <a href="https://disboard.org/review/create/946880412343492638" target="_blank" onClick={saveDisboardClick}>
          <Tooltip hasArrow={true} aria-label="Informations"
                   placement="left" bg="orange.400"
                   label={ texts.buttons.disboardTooltip }
          >
            <Button variantColor="yellow" variant="outline" size="md">
              <FontAwesomeIcon icon={faStar} style={{ marginRight: '15px', color: '#dbbd49' }} />
              { texts.buttons.disboard }
            </Button>
          </Tooltip>
        </a>
      </Box>
    )
  }
  
  const seeActivityClassement = () => {
    return (
      <Box>
        <a href="https://www.draftbot.fr/levels/946880412343492638" target="_blank" onClick={saveClassementClick}>
          <Button variantColor="orange" variant="outline" size="sm">
            <FontAwesomeIcon icon={faListOl} style={{ marginRight: '15px', color: '#e37f1e' }} />
            { texts.buttons.activity }
          </Button>
        </a>
      </Box>
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
            <FontAwesomeIcon icon={faDiscord} size="3x" color="#7289DA" />
            <Heading textAlign="center" mt="1rem">{ texts.heading.title }</Heading>
            <Text fontSize="xl" lineHeight="tall" textAlign="center" dangerouslySetInnerHTML={{ __html: texts.heading.preline + '🚀✨'}}/>
            <Text>
              { texts.content.firstLine }
              <b> CNRS :
                <a
                  color="teal.500"
                  href="https://www.cnrs.fr/fr/cnrsinfo/derriere-le-blob-la-recherche-une-experience-de-science-participative-du-cnrs"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faLink} style={{ marginLeft: '5px' }} /> "Derrière le blob, la recherche"
                </a>
              </b>
              <br/><br/>
              { texts.content.secondLine }
            </Text>
            <Box mt="15px" style={{ marginBottom: '5px' }}>
              <Stack isInline={true} align="center" justifyContent="center">
                { joinDiscordServer() }
              </Stack>
            </Box>
            <Divider />
            <Box>
              <Stack isInline={true} align="center" justifyContent="center">
                { rateUsOnDisboard() }
              </Stack>
              <Stack isInline={true} align="center" justifyContent="center" mt="15px">
                { seeActivityClassement() }
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  )
}

export default DiscordPageComponent
