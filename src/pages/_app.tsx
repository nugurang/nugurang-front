import type { AppProps } from 'next/app'
import GlobalStyle from '@/src/styles/global';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';
import { appWithTranslation } from 'next-i18next';
import darkTheme from '@/src/styles/darkTheme';
import lightTheme from '@/src/styles/lightTheme';
import { useState } from 'react';

function RootApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isDark, setIsDark] = useState<boolean>(false);
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Component {...pageProps} isDark={isDark} setIsDark={setIsDark}/>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(RootApp);
