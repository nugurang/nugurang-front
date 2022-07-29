import type { AppProps } from "next/app";
import { Global, ThemeProvider } from "@emotion/react";
import globalCss from "../styles/global";
import { lightTheme, darkTheme } from "../styles/theme";
import { WindowSizeProvider } from "@/contexts/WindowSizeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <WindowSizeProvider>
        <Global styles={globalCss} />
        <Component {...pageProps} />
      </WindowSizeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
