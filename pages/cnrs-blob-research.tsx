import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Page from 'components/pages/cnrs-blob'
import axios from 'axios'
import { getPage } from '../helpers/getPageHelper'
import getVisitorsCount from '../helpers/getVisitorsCount'

import type { Page as PageProps } from '../../'

interface Props {
  visitors: number
  page: PageProps
}

const CnrsBlobResearchPage: NextPage<Props> = (props) => {
  const router = useRouter()
  const { pages, locale } = props
  const page = getPage({ pages, locale, pathname: '/cnrs-blob-research' })
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

export default CnrsBlobResearchPage
