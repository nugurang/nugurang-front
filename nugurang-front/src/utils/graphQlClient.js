import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const link = from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_BACKEND_ADDR_PUBLIC}/graphql`,
    credentials: 'include'
  }),
]);

const graphQlClient = new ApolloClient({
  ssrMode: typeof(window) === 'undefined',
  cache: new InMemoryCache(),
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});

export default graphQlClient;
