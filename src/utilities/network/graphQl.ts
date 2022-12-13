import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  FetchResult,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import CommonConstants from '@/constants/common';
import IsomorphismManager from '@/utilities/common/isomorphism';
import type { IsomorphicGetServerSidePropsContext } from '@/utilities/common/isomorphism';

const link = from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.error(`[GraphQL Network error]: ${networkError}`);
  }),
  new HttpLink({
    uri: `${CommonConstants.backendRootUrl}/graphql`,
    credentials: 'include',
  }),
]);

const getClient = (() => {
  let instance: ApolloClient<NormalizedCacheObject> | null = null;

  return () => {
    if(!instance) {
      instance = new ApolloClient({
        ssrMode: IsomorphismManager.isServer,
        cache: new InMemoryCache(),
        link,
        headers: {
        },
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
          },
          query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
          },
        },
      });
    }
    return instance;
  }
})();

export const flatApolloQueryResult = (
  result: ApolloQueryResult<any>,
  dataPropertyName: string,
) => ({
  ...result,
  data: dataPropertyName ? result.data[dataPropertyName] : result.data,
});

export const flatApolloMutationResult = (
  result: FetchResult<any>,
  dataPropertyName: string,
) => ({
  ...result,
  data: dataPropertyName ? result.data[dataPropertyName] : result.data,
});

interface QueryProps {
  query: DocumentNode;
  variables?: object;
  dataPropertyName?: string;
}
export const query = async (
  context: IsomorphicGetServerSidePropsContext,
  props: QueryProps,
) => {
  const { query: _query, variables = {}, dataPropertyName } = props;
  const result = await getClient().query({
    query: _query,
    variables,
    context: {
      headers: {
        Cookie: context ? context.req.headers.cookie : null,
      },
    },
  });
  if (result.error) {
    throw {
      data: undefined,
      loading: undefined,
      networkStatus: undefined,
      error: {
        message: undefined,
        graphQLErrors: undefined,
        clientErrors: undefined,
        extraInfo: undefined,
        name: undefined,
        networkError: result.error,
      },
    } as unknown as ApolloQueryResult<object>;
  }
  if (result.errors) {
    throw {
      data: undefined,
      loading: undefined,
      networkStatus: undefined,
      serverErrors: result.errors[0],
    } as unknown as ApolloQueryResult<object>;
  }
  return dataPropertyName
    ? flatApolloQueryResult(result, dataPropertyName)
    : result;
};

interface MutationProps {
  mutation: DocumentNode;
  variables?: object;
  dataPropertyName?: string;
}
export const mutate = async (
  context: IsomorphicGetServerSidePropsContext,
  props: MutationProps,
) => {
  const { mutation, variables = {}, dataPropertyName } = props;
  const result = await getClient().mutate({
    mutation,
    variables,
    context: {
      headers: {
        Cookie: context ? context.req.headers.cookie : null,
      },
    },
  });
  return dataPropertyName
    ? flatApolloMutationResult(result, dataPropertyName)
    : result;
};

const GraphQlApiManager = {
  getClient,
  query,
  mutate
};

export default GraphQlApiManager;
