import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Page from 'components/pages/stationeers'
import axios from 'axios'
import { getPage } from '../helpers/getPageHelper'

import type { Page as PageProps } from '../../'

interface Props {
  page: PageProps
  playersCount: number
  online: number
  accessibility: 'puublic' | 'whitelist' | 'private'
  stationeersClicks: number
  stationeersReviewsClicks: number
}

const StationeersPage: NextPage<Props> = (props) => {
  const router = useRouter()
  const { pages, locale } = props
  const page = getPage({ pages, locale, pathname: '/stationeers' })
  const pageProps = {
    ...props, path: router.path, page: page.attributes,
  }
  const title = page.attributes.data.title
  return (
    <>
      <Head>
        <title>{ title }</title>
      </Head>
      <Page { ...pageProps }/>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const dbStats = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`)
  const { data: dnStatsData } = dbStats.data
  const { attributes } = dnStatsData
  const {
    stationeers_clicks: stationeersClicks,
    stationeers_reviews_clicks: stationeersReviewsClicks,
  } = attributes
  const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/config`)
  const { data } = res.data
  const { attributes: attr } = data
  
  return {
    props: {
      accessibility: attr.stationeers_accessibility,
      playersCount: attr.stationeers_players_count ?? 0,
      stationeersClicks,
      stationeersReviewsClicks,
      online: attr.stationeers_online,
    },
  }
}

export default StationeersPage
