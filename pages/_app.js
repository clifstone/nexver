import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';


import '../styles/style.scss'

function MyApp({ Component, pageProps }) {

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Clif R.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}

export default MyApp