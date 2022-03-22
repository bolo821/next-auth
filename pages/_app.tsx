import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import axios from 'axios'
import React, { useEffect } from 'react'
import NextApp, { AppContext, AppInitialProps, AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import Error from 'next/error'
import Head from 'next/head'

import Script from 'next/script'
import { DefaultSeo } from 'next-seo'
import Layout from 'components/layout'
import Footer from 'components/layout/footer'
import { Alert } from 'components/common'

import getVisitorsCount from '../helpers/getVisitorsCount'
import * as ga from '../lib/google-analytics'
import SEO from '../configs/seo.json'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'bootstrap/dist/css/bootstrap.css'
import { NextComponentType } from 'next'

// const App = ({ Component, pageProps }: AppProps) => {
const App: NextComponentType<AppContext, AppInitialProps, AppProps> = (appProps: AppProps) => {
  const { Component, pageProps } = appProps
  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  }
  const router = useRouter()
  const { session } = pageProps
  useEffect(() => {
    const handleRouteChange = (url) => ga.pageview(url)
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)
    
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])
  
  return (
    <>
      <DefaultSeo {...SEO} />
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></Script>
        <Script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }} />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          <CSSReset/>
          <Layout { ...pageProps }>
            <Alert />
            <Component { ...pageProps } />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </>
  )
}

App.getInitialProps = async (ctx) => {
  await NextApp.getInitialProps(ctx)
  const { pageProps } = ctx
  /*
  if (req && req.headers['x-real-ip']) console.log('new visitors')
  
  if (req && req.headers['x-real-ip'] !== process.env.DEV_IP) {
    await axios.put(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`, {
      data: { visitors: visitors + 1 }
    })
  }
  * */
  const stats = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/stat`)
  const pages = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/pages/?locale=en&locale=fr`)
  const { data } = stats.data
  const { attributes } = data
  const {
    visitors,
    youtube_clicks: ytClicks,
    twitter_clicks: twitterClicks,
    twitch_clicks: twitchClicks,
    disboard_clicks: disboardClicks,
    discord_classement_clicks: discordClassementClicks,
    yt_subscribers: ytSubscribers,
    twitter_subscribers: twitterSubscribers,
    twitch_subscribers: twitchSubscribers,
  } = attributes
  
  return {
    pageProps: {
      pathname: ctx.router.asPath,
      locale: 'fr',
      visitors,
      pages: pages.data,
      ytClicks,
      twitterClicks,
      twitchClicks,
      ytSubscribers,
      twitterSubscribers,
      twitchSubscribers,
      ...pageProps,
    }
  }
}

export default App
