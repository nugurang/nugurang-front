import type { AppProps } from 'next/app'
import GlobalStyle from '../styles/global';
import { ThemeProvider } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';
import theme from '../styles/theme';

function RootApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(RootApp);
