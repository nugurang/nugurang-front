import { ApolloClient, DefaultOptions, InMemoryCache, createHttpLink, from } from '@apollo/client';

import { onError } from "@apollo/client/link/error";

const link = from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.error(`[Network error]: ${networkError}`);
  }),
  createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
    credentials: 'include'
  }),
]);

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const apolloClient = new ApolloClient({
  ssrMode: typeof(window) === 'undefined',
  cache: new InMemoryCache(),
  link,
  defaultOptions
});

export default apolloClient;
