import {
  Box,
  Stack,
  Link as _Link,
  Button,
  IconButton,
  Select,
  useColorMode
} from '@chakra-ui/core'
import React, { useState } from 'react'
import { NextComponentType } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { alertService } from '../../services'

const Navbar: NextComponentType = ({ locale }) => {
  const [options, setOptions] = useState({
    autoClose: true,
    keepAfterRouteChange: false,
  })
  
  const handleOptionChange = (e: any) => {
    const { name, checked } = e.target
    setOptions(options => ({ ...options, [name]: checked }))
  }
  
  const { data: session, status } = useSession()
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = { light: 'white', dark: 'gray.800' }
  const color = { light: 'gray.800', dark: 'gray.100' }
  
  const handleToggleTheme = () => toggleColorMode()
  const handleToggleLang = (e) => {
    const newLang = document.getElementById('langSwitcher').value
    console.log('newLang', newLang, typeof newLang)
    if (!newLang || newLang === '') return
    if (newLang !== localStorage.getItem('locale')) {
      localStorage.setItem('locale', newLang ? newLang : locale)
      alertService.info('Reloading')
      location.reload()
    }
  }
  
  
  const linksForAllUsers = [
    {
      id: 'home',
      label: 'Accueil',
      href: '/'
    },
    {
      id: 'discord',
      label: 'Discord',
      href: '/discord'
    }, {
      id: 'stationeers',
      label: 'Stationeers',
      href: '/stationeers'
    }, {
      id: 'blob-cnrs',
      label: 'Derrière le blob: La recherche (@CNRS)',
      href: '/cnrs-blob-research'
    }, {
      id :'editor',
      label: 'SunEditor',
      href: '/editor'
    }
  ]
  
  const linksForAuthenticatedUsers = [
    {
      id: 'myAccount',
      label: 'Mon compte',
      href: '/my-account'
    }
  ]
  
  const signInButtonNode = () => {
    if (session) {
      return false
    }
    
    return (
      <Box>
        <Link href="/login">
          <Button
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Connexion
          </Button>
        </Link>
      </Box>
    )
  }
  
  const signOutButtonNode = () => {
    if (!session) {
      return false
    }
    
    return (
      <Box>
        <Link href="/api/auth/signout">
          <Button
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign Out
          </Button>
        </Link>
      </Box>
    )
  }
  
  const themeToggleButtonNode = () => {
    return (
      <IconButton
        aria-label="Toggle theme"
        fontSize="20px"
        icon={colorMode === 'dark' ? 'sun' : 'moon'}
        onClick={ handleToggleTheme }
      />
    )
  }
  
  const langToggleSelectNode = () => {
    return (
      <Select placeholder="Select Language" defaultValue={locale} onChange={ handleToggleLang } id="langSwitcher">
        <option value="fr">🇫🇷 Français</option>
        <option value="en">🇬🇧 Anglais</option>
      </Select>
    )
  }
  
  return (
    <Stack >
      <Box p={4} color={color[colorMode]} shadow="lg" pos="relative" bg={bgColor[colorMode]} w="100%">
        <Box maxW="xl" mx="auto" w="full">
          <Stack
            isInline={true}
            spacing={ 4 }
            align="center"
            justifyContent="space-between"
            w="full"
          >
            <Box className="col-12">
              <Stack isInline={true} spacing={4} align="center" fontWeight="semibold">
                {linksForAllUsers.map((link) => {
                  return (
                    <Box key={link.id}>
                      <Link href={link.href}>
                        <_Link>{link.label}</_Link>
                      </Link>
                    </Box>
                  )
                })}
                { session &&
                  linksForAuthenticatedUsers.map((link) => {
                    return (
                      <Box key={link.id}>
                        <Link href={link.href}>
                          <_Link>{link.label}</_Link>
                        </Link>
                      </Box>
                    )
                  }) }
              </Stack>
            </Box>
            <Box className="col-4">
              <Stack isInline={true} spacing={4} align="center">
                {signInButtonNode()}
                {signOutButtonNode()}
                {themeToggleButtonNode()}
                {langToggleSelectNode()}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  )
}

export default Navbar
