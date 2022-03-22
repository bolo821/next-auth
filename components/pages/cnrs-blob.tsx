import React from 'react'
import {
  AspectRatioBox,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
  useColorMode
} from '@chakra-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicroscope } from '@fortawesome/free-solid-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'
import axios from 'axios'

const StationeersPageComponent = ({
  page,
}) => {
  const texts = page.data
  const containerMinWidth: string = '70rem'
  const containerPadding: string = '1rem'
  const { colorMode } = useColorMode()
  const bgColor = { light: 'white', dark: 'gray.800' }
  const color = { light: 'gray.800', dark: 'gray.100' }
  
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
            <FontAwesomeIcon icon={faMicroscope} size="5x" color="#89b13c" />
            <Heading textAlign="center" mt="1rem">{texts.heading.title}</Heading>
            <Text fontSize="xl" lineHeight="tall" textAlign="center">{ texts.heading.preline }</Text>
            <Divider width="50%" mb="auto" mx="auto" />
            <Heading textAlign="center" as="h4" size="md">{ texts.heading.videoIntro }</Heading>
            <Box>
              <AspectRatioBox ratio={16 / 9}>
                <Box
                  as="iframe"
                  src="https://www.youtube.com/embed/bBV1eiVv0u8?autoplay=1&mute=1"
                  alt="Stationeers Trailer"
                />
              </AspectRatioBox>
            </Box>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  )
}

export default StationeersPageComponent
