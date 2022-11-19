import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layouts/Main";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function App({ Component, pageProps }: AppProps) {
  const { session, ...restProps } = pageProps;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", (url) => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
    });
  }, [Router]);

  return (
    <SessionProvider session={session}>
      <Head>
        <meta content="Facebook" name="Development by Duy Nguyen" />
      </Head>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Layout>
            <Component {...restProps} />
          </Layout>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="light"
          />
        </>
      )}
    </SessionProvider>
  );
}
