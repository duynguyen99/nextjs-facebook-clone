import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layouts/Main";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  
  const { session, ...restProps } = pageProps;
  return (
    <SessionProvider session={session}>
      <Head>
        <meta content="Facebook" name="Development by Duy Nguyen" />
      </Head>
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
    </SessionProvider>
  );
}
