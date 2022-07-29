import type { AppProps } from 'next/app';
import { Global, ThemeProvider } from '@emotion/react'
import { global, theme } from "../styles"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={global} /> 
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
