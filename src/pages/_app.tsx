import type { AppProps } from 'next/app'
import GlobalStyle from '@/src/styles/global';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';
import { appWithTranslation } from 'next-i18next';
import darkTheme from '@/src/styles/darkTheme';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library as fontawesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import lightTheme from '@/src/styles/lightTheme';
import { useState } from 'react';

fontawesomeLibrary.add(fab, far, fas);

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
