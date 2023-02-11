
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
import { Global, css } from '@emotion/react'
import { library, config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import GraphQlApiManager from '@/utilities/network/graphQl';
import globalStyles from '@/styles/global';
import { ThemeProvider } from '@/components/theme';

// Prevent fontawesome from dynamically adding its css since we are going to include it manually
config.autoAddCss = false;

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
  
  return <>
    <Head>
      <title>nugurang</title>
    </Head>
    <ApolloProvider client={GraphQlApiManager.getBackendApolloClient()}>
      <ThemeProvider>
      <Global
        styles={globalStyles}
      />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  </>;
};

export default appWithTranslation(RootApp);
