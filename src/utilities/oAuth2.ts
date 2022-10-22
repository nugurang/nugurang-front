import {
  type OAuth2Provider,
  OAuth2ProviderConstant,
} from '@/constants/oAuth2';
import { frontendRootUrl } from '@/constants/url';

export const getAuthorizationCodeAndRedirect = async (
  oAuthProvider: OAuth2Provider,
) => {
  if (typeof window === 'undefined') return;
  switch (oAuthProvider) {
    case 'github':
      {
        const params = {
          client_id: OAuth2ProviderConstant[oAuthProvider].id,
          redirect_uri: `${frontendRootUrl}/oauth/login/callback/${oAuthProvider}`,
          scope: OAuth2ProviderConstant[oAuthProvider].scope.join(','),
          state: 'nugurang', // TODO: insert state here
        };
        const query = Object.keys(params)
          .map(
            (k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`,
          )
          .join('&');
        window.location.assign(
          OAuth2ProviderConstant[oAuthProvider].getCodeUrl +
            (query ? `?${query}` : ''),
        );
      }
      break;
    default:
      break;
  }
};

export const getAccessToken = async (
  oAuthProvider: OAuth2Provider,
  oAuthAuthorizationCode: string,
) => {
  switch (oAuthProvider) {
    case 'github': {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: OAuth2ProviderConstant[oAuthProvider].id,
          client_secret: OAuth2ProviderConstant[oAuthProvider].secret,
          code: oAuthAuthorizationCode,
          redirect_uri: `${frontendRootUrl}/oauth/login/callback/github`,
        }),
      };
      const response = await fetch(
        OAuth2ProviderConstant[oAuthProvider].getAccessTokenUrl,
        options,
      );
      const { error, access_token: accessToken } = await response.json();
      if (error) {
        console.error(error);
      } else {
        return accessToken;
      }
      break;
    }
    default:
      break;
  }
  return false;
};
