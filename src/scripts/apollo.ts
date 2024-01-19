import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option'

export const apolloClient = new ApolloClient({
    uri: import.meta.env.GRAPHQL_URL,
    cache: new InMemoryCache(),
});

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})

