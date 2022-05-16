import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://www.kip.cat/mcwp/graphql",
    cache: new InMemoryCache(),
});

export default client;