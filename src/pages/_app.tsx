import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Global, ThemeProvider } from "@emotion/react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import globalCss from "@/styles/global";
import { lightTheme, darkTheme } from "@/styles/theme";
import { WindowSizeProvider } from "@/contexts/WindowSizeContext";
import { setCookie } from "@/utilities/cookie";
import { isAuthUrl } from "@/services/oAuth";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthUrl(router.asPath))
      setCookie(null, "lastUrlBeforeAuthPage", router.asPath);
  }, []);
  useEffect(() => {
    const handleStart = (url: string) => {
      if (!isAuthUrl(router.asPath))
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
      <ThemeProvider theme={lightTheme}>
        <WindowSizeProvider>
          <Global styles={globalCss} />
          <Component {...pageProps} />
        </WindowSizeProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
