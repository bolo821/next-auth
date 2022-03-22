import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Head from 'next/head'
import Page from 'components/pages/discord'
import { redirectLoggedUser } from 'helpers/common'
import { getPage } from 'helpers/getPageHelper'
import Login from 'components/pages/users/login'

import type { Page as PageProps } from '../../'

const ProfilePage: NextPage = (props) => {
  const router = useRouter()
  const pageProps = {
    ...props, path: router.path
  }
  redirectLoggedUser()
  return (
    <>
      <Head>
        <title>Mon profil</title>
      </Head>
      <Profile {...props} />
    </>
  )
}

ProfilePage.getServerSideProps = ({ req }) => {
  console.log(req)
  // const { user } = req.session
  
  if (!req) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  
  return {
    props: { user: {} },
  }
}

export default ProfilePage
