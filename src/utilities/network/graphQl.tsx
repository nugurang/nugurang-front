import { GetServerSidePropsContext } from 'next';
import {
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  FetchResult,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import EnvConstants from '@/constants/env';
import IsomorphismManager from '@/utilities/common/isomorphism';
import Logger from '@/utilities/common/logger';
import type { PlainObject } from '@/constants/common';
import BackendConnectionError from '@/errors/network/BackendConnectionError';
import InvalidBackendUrlPathnameError from '@/errors/network/InvalidBackendUrlPathnameError';
import LoginRequiredError from '@/errors/network/LoginRequiredError';

const backendHttpLink = from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        Logger.warn(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) Logger.warn(`[GraphQL Network error]: ${networkError}`);
  }),
  new HttpLink({
    uri: `${EnvConstants.backendRootUrl}/graphql`,
    credentials: 'include',
  }),
]);

const getBackendApolloClient = (() => {
  let instance: ApolloClient<NormalizedCacheObject> | null = null;
  return () => {
    if(!instance) {
      instance = new ApolloClient({
        ssrMode: IsomorphismManager.isServer,
        cache: new InMemoryCache(),
        link: backendHttpLink,
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

interface ApplicationQueryProps {
  query: DocumentNode;
  variables?: PlainObject;
  context?: GetServerSidePropsContext;
}
export const queryToBackend = async (
  props: ApplicationQueryProps,
) => {
  try {
    const { query: _query, variables = {}, context = null } = props;
    const response = await getBackendApolloClient().query({
      query: _query,
      variables,
      context: {
        headers: {
          Cookie: context ? context.req.headers.cookie : null,
        },
      },
    });
    return response;
  } catch(error) {
    if(error?.networkError?.statusCode === 401) {
      throw new LoginRequiredError;
    } else if(error?.networkError?.statusCode === 404) {
      throw new InvalidBackendUrlPathnameError;
    } else {
      throw new BackendConnectionError;
    }
  }
};

interface MutationProps {
  mutation: DocumentNode;
  variables?: PlainObject;
  context?: GetServerSidePropsContext;
}
export const mutateToBackend = async (
  props: MutationProps,
) => {
  try {
    const { mutation, variables = {}, context = null } = props;
    const response = await getBackendApolloClient().mutate({
      mutation,
      variables,
      context: {
        headers: {
          Cookie: context ? context.req.headers.cookie : null,
        },
      },
    });
    return response;
  } catch(error) {
    if(error?.networkError?.statusCode === 401) {
      throw new LoginRequiredError;
    } else if(error?.networkError?.statusCode === 404) {
      throw new InvalidBackendUrlPathnameError;
    } else {
      throw new BackendConnectionError;
    }
  }
};

const GraphQlApiManager = {
  getBackendApolloClient,
  queryToBackend,
  mutateToBackend
};

export default GraphQlApiManager;
