import { type OAuthProvider, OAuthProviderConstant } from "@/constants/oAuth";
import { backendRootUrl, frontendRootUrl } from "@/constants/base";
import { getCookies } from "@/utilities/cookie";
import {
  getAccessToken,
  getAuthorizationCodeAndRedirect,
} from "@/services/oAuth";

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
    case "github": {
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
            issuedAt: String(new Date().getTime() / 1000000),
            expiresAt: String(new Date(8640000000000000).getTime() / 1000000),
            scopes: OAuthProviderConstant["github"].scope,
          },
          refreshToken: {
            tokenValue: accessToken,
            issuedAt: String(new Date().getTime() / 1000000),
            expiresAt: String(new Date(8640000000000000).getTime() / 1000000),
          },
          additionalParameters: {},
        }),
      };
      const response = await fetch(`${backendRootUrl}/login`, options);
      const responseJson = await response.json();
      if (responseJson.errors) {
        console.error(responseJson.errors);
      } else {
        const userDataAttributes = responseJson.data.principal.attributes;
        const query = {};
        [
          { key: "name", attributeKey: "name" },
          { key: "nickname", attributeKey: "login" },
          { key: "email", attributeKey: "email" },
          { key: "avatarUrl", attributeKey: "avatar_url" },
          { key: "bio", attributeKey: "bio" },
        ].forEach(({ key, attributeKey }) => {
          if (userDataAttributes[attributeKey])
            query[key] = userDataAttributes[attributeKey];
        });
        return query;
      }
    }
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
  console.log(response);
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
