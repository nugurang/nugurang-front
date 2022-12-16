import {
  ApolloError,
  ApolloClient,
  ApolloQueryResult,
  DocumentNode,
  FetchResult,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  ServerError
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import EnvConstants from '@/constants/env';
import IsomorphismManager from '@/utilities/common/isomorphism';
import Logger from '@/utilities/common/logger';
import type { PlainObject } from '@/constants/common';
import { GetServerSidePropsContext } from 'next';

const DynamicImports: PlainObject = {};
if(IsomorphismManager.isServer) {
  import('next/headers').then(({ cookies }) => {
    DynamicImports.cookies = cookies;
  });
}

const link = from([
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

const getInstance = (() => {
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

interface ApplicationQueryProps {
  query: DocumentNode;
  variables?: PlainObject;
  dataPropertyName?: string;
  context?: GetServerSidePropsContext;
}
export interface ApplicationQueryResponse<T> {
  loading: boolean;
  statusCode: number;
  data?: T;
  error?: ApolloError;
}
export interface ApplicationQueryResponse<T> {
  loading: boolean;
  statusCode: number;
  data?: T;
}
export interface ApplicationQueryError {
  loading: boolean;
  statusCode: number;
  error?: ApolloError;
}
export const query = async (
  props: ApplicationQueryProps,
) => {
  const { query: _query, variables = {}, dataPropertyName, context = null } = props;
  try {
    const response = await getInstance().query({
      query: _query,
      variables,
      context: {
        headers: {
          // Cookie: IsomorphismManager.isServer ? `JSESSIONID=${DynamicImports.cookies().get('JSESSIONID').value}` : document.cookie,
          Cookie: context ? context.req.headers.cookie : null,
        },
      },
    });
    if (response.error || response.errors) {
      throw response;
    }
    return {
      loading: response.loading,
      networkStatus: response.networkStatus,
      data: dataPropertyName ? response.data[dataPropertyName] : response.data,
    };
  } catch(error) {
    Logger.error(error as PlainObject);
    const statusCode = ((error as ApolloError).networkError as ServerError)?.statusCode ?? 500;
    throw {
      loading: false,
      statusCode,
      error,
    };
  }
};

interface MutationProps {
  mutation: DocumentNode;
  variables?: PlainObject;
  dataPropertyName?: string;
  context?: GetServerSidePropsContext;
}
export const mutate = async (
  props: MutationProps,
) => {
  const { mutation, variables = {}, dataPropertyName, context = null } = props;
  try {
    const response = await getInstance().mutate({
      mutation,
      variables,
      context: {
        headers: {
          // Cookie: IsomorphismManager.isServer ? `JSESSIONID=${DynamicImports.cookies().get('JSESSIONID').value}` : document.cookie,
          Cookie: context ? context.req.headers.cookie : null,
        },
      },
    });
    return {
      ...response,
      data: dataPropertyName ? response.data[dataPropertyName] : response.data,
    };
  } catch(error) {
    Logger.error(error as PlainObject);
  }
};

const GraphQlApiManager = {
  getInstance,
  query,
  mutate
};

export default GraphQlApiManager;
