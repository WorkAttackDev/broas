import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Header from "../features/core/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
