import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include'
});

export default new ApolloClient({
  cache: new InMemoryCache(),
  link
});
