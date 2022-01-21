import type { AppProps } from 'next/app'
import GlobalStyle from '../styles/global';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';
import { appWithTranslation } from 'next-i18next';
import darkTheme from '../styles/darkTheme';
import lightTheme from '../styles/lightTheme';
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
