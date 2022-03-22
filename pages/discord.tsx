import React, { useContext } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Page from 'components/pages/discord'
import { getPage } from '../helpers/getPageHelper'

import type { Page as PageProps } from '../../'

interface Props {
  id: string
  page: PageProps
  invitation: string
  clicks: number
  disboardClicks: number
  disboardUsers: number
  visitors: number
  discordClassementClicks: number
  path: string
}

const DiscordPage: NextPage<Props> = (props) => {
  const router = useRouter()
  const { pages, locale } = props
  const page = getPage({ pages, locale, pathname: '/discord' })
  const pageProps = {
    ...props, path: router.path, page: page.attributes,
  }
  const title = page.attributes.data.title

  if (props.loginResult === null) {
    console.log('==============================================>');
    console.log('You can use control ths error message.');
    console.log('==============================================>');
  }
  return (
    <>
      <Head>
        <title>{ title }</title>
      </Head>
      <Page {...pageProps}/>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { isSerializable } = require('../helpers/checkSerialized');

  try {
    const loginResult = await axios.get(`https://universe-travel.eu/email-login/?loginToken=85e07a0b22ae6f1036b22e57cabde76e67b71f07`);
  
    return {
      props: {
        loginResult,
      }
    }
  } catch (error) {
    if (isSerializable(error)) {
      return {
        props: {
          error: error
        }
      }
    } else {
      return {
        props: {
          loginResult: null
        }
      }
    }
  } 


  const { pathname, req, pageProps } = ctx
  const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/discord-invitations`)
  const stats = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`)
  const { data } = res.data
  const dbStats = {
    visitors: stats.data.data.attributes.visitors,
    disboardClicks: stats.data.data.attributes.disboard_clicks,
    discordUsers: stats.data.data.attributes.discord_users,
    discordClassementClicks: stats.data.data.attributes.discord_classement_clicks
  }
  const findActive = data.find(row => row.attributes.is_active === true)
  if (!findActive) return {
    id: null,
    clicks: null,
    invitation: undefined,
    ...dbStats,
  }
  const { id, attributes: attr } = findActive
  const activeInvitation = findActive ? attr.code : undefined
  const invitation = activeInvitation ? `https://discord.gg/${activeInvitation}` : undefined
  return {
    props: {
      id,
      invitation,
      clicks: attr.clicks,
      ...dbStats,
    }
  }
}

export default DiscordPage
