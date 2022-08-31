import type { AppProps } from "next/app";

function MatchaCreamApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MatchaCreamApp;
