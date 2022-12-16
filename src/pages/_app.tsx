
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from '@apollo/client';
import GraphQlApiManager from '@/utilities/network/graphQl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Mocks from '../mocks';
import '@/styles/global.css';

library.add(fab);
library.add(fas);

const RootApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const handleStart = () => {};
    const handleStop = () => {};

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
    };
  }, []);
  if (process.env.NEXT_PUBLIC_APP_MODE === 'mock') {
    Mocks.initMockAPI();
  }
  return <>
    <Head>
      <title>nugurang</title>
    </Head>
    <ApolloProvider client={GraphQlApiManager.getInstance()}>
      <Component {...pageProps} />
    </ApolloProvider>
  </>;
};

export default appWithTranslation(RootApp);
