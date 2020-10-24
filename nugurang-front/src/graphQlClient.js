import { from, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { BACKEND_ADDR } from './config';

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
    uri: `${BACKEND_ADDR}/graphql`,
    credentials: 'include'
  }),
]);

export default new ApolloClient({
  cache: new InMemoryCache(),
  link
});
