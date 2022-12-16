import EnvConstants from '@/constants/env';
import AppErrors from '@/constants/appError';
import OAuth2Constants from '@/constants/oAuth2';
import type { OAuth2Provider } from '@/constants/oAuth2';
import RestApiManager from '@/utilities/network/rest';
import { PlainObject } from '@/constants/common';

const getAuthorizationCodeAndRedirect = async (
  oAuthProvider: OAuth2Provider,
) => {
  const params = {
    client_id: OAuth2Constants.providers[oAuthProvider].id,
    redirect_uri: `${EnvConstants.frontendRootUrl}/oauth2/login/callback/${oAuthProvider}`,
    scope: OAuth2Constants.providers[oAuthProvider].scope.join(','),
    state: OAuth2Constants.common.csrfState
  };
  const query = Object.entries(params).map(
    ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value ?? '')}`
  ).join('&');
  window.location.assign(
    `${EnvConstants.frontendRootUrl}${OAuth2Constants.providers[oAuthProvider].getCodePathname}${query ? `?${query}` : ''}`
  );
};
export const oAuth2Login = getAuthorizationCodeAndRedirect;

const getAccessToken = async (
  oAuthProvider: OAuth2Provider,
  oAuthAuthorizationCode: string,
) => {
  const options = {
    data: {
      client_id: OAuth2Constants.providers[oAuthProvider].id,
      client_secret: OAuth2Constants.providers[oAuthProvider].secret,
      code: oAuthAuthorizationCode,
      redirect_uri: `${EnvConstants.frontendRootUrl}/oauth2/login/callback/${oAuthProvider}`,
    },
  };
  const getAccessTokenResponse = await RestApiManager.postToFrontend(
    OAuth2Constants.providers[oAuthProvider].getAccessTokenPathname,
    options,
  );
  const {
    error,
    access_token: accessToken
  } = getAccessTokenResponse.data;
  if (error) {
    throw error;
  }
  return accessToken;
};

export const login = async (
  oAuthProvider: OAuth2Provider,
  oAuthAuthorizationCode: string,
) => {
  const responses: PlainObject = {};
  try {
    const accessToken = await getAccessToken(
      oAuthProvider,
      oAuthAuthorizationCode,
    );
    responses.accessToken = accessToken;
  } catch(error) {
    throw AppErrors.auth.BackendLoginInternalError;
  }
  const options = {
    data: {
      clientRegistrationId: oAuthProvider,
      accessToken: {
        tokenValue: responses.accessToken,
        issuedAt: String(Math.floor(new Date().getTime() / 1000)),
        expiresAt: String(new Date(8640000000000).getTime() / 1000),
        scopes: OAuth2Constants.providers[oAuthProvider].scope,
      },
      refreshToken: {
        tokenValue: responses.accessToken,
        issuedAt: String(Math.floor(new Date().getTime() / 1000)),
        expiresAt: String(new Date(8640000000000).getTime() / 1000),
      },
      additionalParameters: {},
    },
  };
  const loginResponse = await RestApiManager.postToBackend('/login', options);
  if (loginResponse.data.errors && loginResponse.data.errors.length > 0) {
    if(loginResponse.data.errors.some((error: any) => error.extensions.type === 'OAuth2AuthenticationException')) {
      throw AppErrors.auth.UserNotExistError;
    } else {
      throw AppErrors.auth.BackendLoginInternalError;
    }
  }
  return loginResponse;
};

export const logout = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  await fetch(`${EnvConstants.backendRootUrl}/logout`, options);
  window.location.assign(`${EnvConstants.frontendRootUrl}/oauth2/logout/callback`);
};
