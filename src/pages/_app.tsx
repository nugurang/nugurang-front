import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Nugurang</title>
      </Head>
      <ApolloProvider client={graphQlClient}>
        <WindowSizeProvider>
          <Grommet theme={darkTheme} full={true}>
            <Component {...pageProps} />
          </Grommet>
        </WindowSizeProvider>
      </ApolloProvider>
    </>
  );
}

export default appWithTranslation(BaseApp);
