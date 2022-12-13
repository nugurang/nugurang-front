import CommonConstants from '@/constants/common';
import OAuth2Constants from '@/constants/oAuth2';
import type { OAuth2Provider } from '@/constants/oAuth2';
import IsomorphismManager from '@/utilities/common/isomorphism';
import RestApiManager from '@/utilities/network/rest';
import CookieManager from '@/utilities/storage/cookie';

export const login = async (
  _oAuthProvider?: OAuth2Provider,
  _oAuthAuthorizationCode?: string,
) => {
  const oAuthProvider: OAuth2Provider =
    _oAuthProvider || (CookieManager.get(null, "oAuthProvider") as OAuth2Provider);
  const oAuthAuthorizationCode =
    _oAuthAuthorizationCode || CookieManager.get(null, "oAuthAuthorizationCode");
  const accessToken = await getAccessToken(
    oAuthProvider,
    oAuthAuthorizationCode,
  );
  switch (oAuthProvider) {
    case 'github':
      {
        const options = {
          data: {
            clientRegistrationId: 'github',
            accessToken: {
              tokenValue: accessToken,
              issuedAt: String(Math.floor(new Date().getTime() / 1000)),
              expiresAt: String(new Date(8640000000000).getTime() / 1000),
              scopes: OAuth2Constants.github.scope,
            },
            refreshToken: {
              tokenValue: accessToken,
              issuedAt: String(Math.floor(new Date().getTime() / 1000)),
              expiresAt: String(new Date(8640000000000).getTime() / 1000),
            },
            additionalParameters: {},
          },
        };
        const response = await RestApiManager.postToBackend('/login', options);
        const setCookieString = response.headers.get('set-cookie') ?? '';
        const jSessionId = CookieManager.parseAndGet(null, setCookieString, 'JSESSIONID');
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
  await fetch(`${CommonConstants.backendRootUrl}/logout`, options);
  window.location.assign(`${CommonConstants.frontendRootUrl}/oauth/logout/callback`);
};

export const getAuthorizationCodeAndRedirect = async (
  oAuthProvider: OAuth2Provider,
) => {
  if (IsomorphismManager.isServer) return;
  const params = {
    client_id: OAuth2Constants[oAuthProvider].id,
    redirect_uri: `${CommonConstants.frontendRootUrl}/oauth/login/callback/${oAuthProvider}`,
    scope: OAuth2Constants[oAuthProvider].scope.join(','),
    state: 'nugurang' // TODO: insert state here
  };
  const query = Object.entries(params)
    .map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value ?? "")}`
    )
    .join('&');
  window.location.assign(
    `${CommonConstants.frontendRootUrl}${OAuth2Constants[oAuthProvider].getCodePathname}${query ? `?${query}` : ''}`
  );
};
export const oAuthLogin = getAuthorizationCodeAndRedirect;

export const getAccessToken = async (
  oAuthProvider: OAuth2Provider,
  oAuthAuthorizationCode: string,
) => {
  const options = {
    data: {
      client_id: OAuth2Constants[oAuthProvider].id,
      client_secret: OAuth2Constants[oAuthProvider].secret,
      code: oAuthAuthorizationCode,
      redirect_uri: `${CommonConstants.frontendRootUrl}/oauth/login/callback/github`,
    },
  };
  const response = await RestApiManager.postToFrontend(
    OAuth2Constants[oAuthProvider].getAccessTokenPathname,
    options,
  );
  const { error, access_token: accessToken } = await response.json();
  if (error) {
    console.error(error);
  } else {
    return accessToken;
  }
  return false;
};
