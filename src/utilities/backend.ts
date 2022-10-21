import { type OAuthProvider, OAuthProviderConstant } from '@/constants/oAuth';
import { backendRootUrl, frontendRootUrl } from '@/constants/url';
import {
  getCookies,
  getValueFromCookieString,
} from '@/utilities/common/cookie';
import {
  getAccessToken,
  getAuthorizationCodeAndRedirect,
} from '@/utilities/oAuth';

import graphQlClient from '@/utilities/graphQlClient';
import { ApolloQueryResult, DocumentNode, FetchResult } from '@apollo/client';
import { GetServerSidePropsContext } from 'next/types';

export const oAuthLogin = getAuthorizationCodeAndRedirect;

export const login = async (
  _oAuthProvider?: OAuthProvider,
  _oAuthAuthorizationCode?: string,
) => {
  const oAuthProvider: OAuthProvider =
    _oAuthProvider || (getCookies(null).oAuthProvider as OAuthProvider);
  const oAuthAuthorizationCode =
    _oAuthAuthorizationCode || getCookies(null).oAuthAuthorizationCode;
  const accessToken = await getAccessToken(
    oAuthProvider,
    oAuthAuthorizationCode,
  );
  switch (oAuthProvider) {
    case 'github':
      {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            clientRegistrationId: 'github',
            accessToken: {
              tokenValue: accessToken,
              issuedAt: String(Math.floor(new Date().getTime() / 1000)),
              expiresAt: String(new Date(8640000000000).getTime() / 1000),
              scopes: OAuthProviderConstant.github.scope,
            },
            refreshToken: {
              tokenValue: accessToken,
              issuedAt: String(Math.floor(new Date().getTime() / 1000)),
              expiresAt: String(new Date(8640000000000).getTime() / 1000),
            },
            additionalParameters: {},
          }),
        };
        const response = await fetch(`${backendRootUrl}/login`, options);
        const setCookieString = response.headers.get('set-cookie');
        const jSessionId = getValueFromCookieString(
          setCookieString,
          'JSESSIONID',
        );
        const responseJson = await response.json();
        if (!jSessionId) {
          console.error(responseJson.errors);
        } else if (responseJson.errors && responseJson.errors.length > 0) {
          console.error(responseJson.errors);
        } else {
          return {
            jSessionId,
          };
        }
      }
      break;
    default:
      break;
  }
  return {
    jSessionId: undefined,
  };
};

export const logout = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  await fetch(`${backendRootUrl}/logout`, options);
  window.location.assign(`${frontendRootUrl}/oauth/logout/callback`);
};

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
  context: GetServerSidePropsContext,
  props: QueryProps,
) => {
  const { query: _query, variables = {}, dataPropertyName } = props;
  const result = await graphQlClient.query({
    query: _query,
    variables,
    context: {
      headers: {
        Cookie: context ? context.req.headers.cookie : null,
      },
    },
  });
  if (result.error) {
    return {
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
    } as ApolloQueryResult<object>;
  }
  if (result.errors) {
    return {
      data: undefined,
      loading: undefined,
      networkStatus: undefined,
      serverErrors: result.errors[0],
    } as ApolloQueryResult<object>;
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
  context: GetServerSidePropsContext,
  props: MutationProps,
) => {
  const { mutation, variables = {}, dataPropertyName } = props;
  const result = await graphQlClient.mutate({
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
