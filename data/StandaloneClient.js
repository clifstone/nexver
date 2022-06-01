import { ApolloClient, InMemoryCache } from "@apollo/client";

export const StandaloneClient = new ApolloClient({
    uri: "https://kip.cat/mcwp/graphql",
    cache: new InMemoryCache(),
});