import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import { Global, ThemeProvider } from "@emotion/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import globalCss from "@/styles/global";
import { lightTheme, darkTheme } from "@/components/theme";
import { WindowSizeProvider } from "@/contexts/WindowSizeContext";
import { setCookie } from "@/utilities/common/cookie";
import { isValidLastUrl } from "@/utilities/common/url";
import graphQlClient from "@/utilities/graphQlClient";

library.add(fab);
library.add(fas);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (isValidLastUrl(router.asPath))
      setCookie(null, "lastUrlBeforeAuthPage", router.asPath);
  }, []);
  useEffect(() => {
    const handleStart = (url: string) => {
      if (isValidLastUrl(router.asPath))
        setCookie(null, "lastUrlBeforeAuthPage", url);
      NProgress.start();
    };
    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Emotion using the vanilla version supporting SSR</title>
      </Head>
      <ApolloProvider client={graphQlClient}>
        <ThemeProvider theme={lightTheme}>
          <WindowSizeProvider>
            <Global styles={globalCss} />
            <Component {...pageProps} />
          </WindowSizeProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
