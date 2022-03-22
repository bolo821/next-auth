import React, { FC, useEffect } from 'react'
import { ColorModeProvider, LightMode } from '@chakra-ui/core'
import Container from 'components/layout/container'
import Navbar from 'components/navbar'
import Footer from './footer'

const Layout: FC = (props) => {
  const { children, ...pageProps } = props
  
  useEffect(() => {
    pageProps.locale = localStorage.getItem('locale')
    document.getElementById('langSwitcher').value = pageProps.locale
  }, [])

  return (
    <ColorModeProvider>
      <LightMode>
        <Navbar {...pageProps} />
        <Container>{children}</Container>
        <Footer {...pageProps} />
      </LightMode>
    </ColorModeProvider>
  )
}

export default Layout
