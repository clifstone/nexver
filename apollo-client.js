import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://www.clif.me/mcwp/graphql",
    cache: new InMemoryCache(),
});

export default client;