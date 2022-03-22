import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import { getPage } from '../helpers/getPageHelper'

import type { Page as PageProps } from '../../'

const CreateStationeersReportPage: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>Créer un rapport stationeers</title>
      </Head>
    </>
  )
}

export default CreateStationeersReportPage
