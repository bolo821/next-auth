import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Head from 'next/head'
import Page from 'components/pages/discord'
import { redirectLoggedUser } from '../helpers/common'
import { getPage } from '../helpers/getPageHelper'
import Login from '../components/pages/users/login'

import type { Page as PageProps } from '../../'

const LoginPage: NextPage = (props) => {
  console.log('login page props', props)
  const router = useRouter()
  const pageProps = {
    ...props, path: router.path
  }
  redirectLoggedUser()
  return (
    <>
      <Head>
        <title>Connexion</title>
      </Head>
      <Login {...props} />
    </>
  )
}

export default LoginPage
