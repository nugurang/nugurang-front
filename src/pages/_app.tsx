import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Grommet } from 'grommet';
import { appWithTranslation } from 'next-i18next';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { WindowSizeProvider } from '@/contexts/WindowSizeContext';
import { lightTheme, darkTheme } from '@/styles/grommet';
import graphQlClient from '@/utilities/graphQlClient';

import '@/styles/styles.css';

library.add(fab);
library.add(fas);

function BaseApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleStop);
    Router.events.on('routeChangeError', handleStop);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleStop);
      Router.events.off('routeChangeError', handleStop);
    };
  }, []);
  return (
    <>
      <Head>
        <title>nugurang</title>
      </Head>
      <ApolloProvider client={graphQlClient}>
        <WindowSizeProvider>
          <Grommet theme={darkTheme} full>
            <Component {...pageProps} />
          </Grommet>
        </WindowSizeProvider>
      </ApolloProvider>
    </>
  );
}

export default appWithTranslation(BaseApp);
