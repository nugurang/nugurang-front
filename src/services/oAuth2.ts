import OAuth2Constants from '@/constants/oAuth2';
import type { OAuth2Provider } from '@/constants/oAuth2';
import RestService from '@/services/rest';

const loginToBackend = async (
  oAuth2Provider: OAuth2Provider,
  accessToken: string,
) => {
  const today = new Date()
  const oneYearAfterToday = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  const issuedAt = String(Math.floor(today.getTime() / 1000))
  const expiresAt = String(Math.floor(oneYearAfterToday.getTime() / 1000))
  const options = {
    data: {
      clientRegistrationId: oAuth2Provider,
      accessToken: {
        tokenValue: accessToken,
        issuedAt,
        expiresAt,
        scopes: OAuth2Constants.providers[oAuth2Provider].scope,
      },
      refreshToken: {
        tokenValue: accessToken,
        issuedAt,
        expiresAt,
      },
      additionalParameters: {},
    },
  };
  const loginResponse = await RestService.postToBackend('/login', options);
  return loginResponse;
};

const OAuth2Service = {
  loginToBackend,
};

export default OAuth2Service;
