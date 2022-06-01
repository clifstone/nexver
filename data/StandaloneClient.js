import { ApolloClient, InMemoryCache } from "@apollo/client";

export const StandaloneClient = new ApolloClient({
    uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
});