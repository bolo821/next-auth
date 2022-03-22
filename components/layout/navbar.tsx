import {
  Box,
  Stack,
  Link as _Link,
  Button,
  IconButton,
  Select,
  useColorMode
} from '@chakra-ui/core'
import {
  Container,
  Nav,
  Navbar,
} from 'react-bootstrap'

import React, { useState } from 'react'
import { NextComponentType } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { alertService } from '../../helpers/alertHelper'

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
  const bgColor = { light: 'white', dark: '#e3f2fd' }
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
  
  /*
  *
  * <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
  * */
  return (
    <Stack>
      <Navbar p={4} color={color[colorMode]} shadow="lg" pos="relative" bg={bgColor[colorMode]} w="100%" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
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
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Stack>
  
  )
}

export default Navbar
