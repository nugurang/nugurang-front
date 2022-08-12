import { type OAuthProvider, OAuthProviderConstant } from "@/constants/oAuth";
import { backendRootUrl, frontendRootUrl } from "@/constants/url";
import {
  getCookies,
  getValueFromCookieString,
} from "@/utilities/common/cookie";
import {
  getAccessToken,
  getAuthorizationCodeAndRedirect,
} from "@/utilities/oAuth";

import graphQlClient from "@/utilities/graphQlClient";

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
    case "github":
      {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            clientRegistrationId: "github",
            accessToken: {
              tokenValue: accessToken,
              issuedAt: String(Math.floor(new Date().getTime() / 1000)),
              expiresAt: String(new Date(8640000000000).getTime() / 1000),
              scopes: OAuthProviderConstant["github"].scope,
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
        const setCookieString = response.headers.get("set-cookie");
        const jSessionId = getValueFromCookieString(
          setCookieString,
          "JSESSIONID",
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
};

export const logout = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const response = await fetch(`${backendRootUrl}/logout`, options);
  window.location.assign(`${frontendRootUrl}/oauth/logout/callback`);
  return;
};

export async function query({ context = null, query, variables = {} }) {
  return await graphQlClient
    .query({
      query,
      variables,
      context: {
        headers: {
          Cookie: context ? context.req.headers.cookie : null,
        },
      },
    })
    .catch((error) => {
      return {
        error,
      };
    });
}

export async function mutate({ context = null, mutation, variables = {} }) {
  return await graphQlClient
    .mutate({
      mutation,
      variables,
      context: {
        headers: {
          Cookie: context ? context.req.headers.cookie : null,
        },
      },
    })
    .catch((error) => {
      return {
        error,
      };
    });
}
