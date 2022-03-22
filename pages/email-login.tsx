import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Head from 'next/head'
import Page from 'components/pages/discord'
import { getPage } from '../helpers/getPageHelper'
// import EmailLogin from '../components/pages/users/emailLogin'
import Exception from './api/exception'
import type { Page as PageProps } from '../../'

const EmailLoginPage: NextPage = (props) => {
  const router = useRouter()
  const pageProps = {
    ...props, path: router.path
  }
  return (
    <>
      <Head>
        <title>Connexion sans mot de passe</title>
      </Head>
      {/* <EmailLogin {...props} /> */}
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { loginToken = undefined } = query
  const loginResult = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/passwordless/login?loginToken=${loginToken}`)
  .catch(error => {
    console.log('error type: ', typeof({"key": "value"}))
    return {
      props: 'error'
    }
  })
  
  console.log(loginResult)
  return {
    props: loginResult
  }
}

export default EmailLoginPage
