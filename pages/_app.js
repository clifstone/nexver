import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import Head from 'next/head';
import Layout from '../components/Layout';


import '../styles/style.scss'

function MyApp({ Component, pageProps }) {

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Clif R.</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <Layout>
        <Component {...pageProps} />
      </Layout>
      
    </ApolloProvider>
  );
}

export default MyApp