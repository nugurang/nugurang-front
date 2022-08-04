import { type OAuthProvider, OAuthProviderConstant } from "@/constants/oAuth";
import { backendRootUrl, frontendRootUrl } from "@/constants/base";
import { getCookies } from "@/utilities/cookie";

export const isAuthUrl = (url: string) => {
  return ["auth", "oauth"].some((keyString: string) =>
    url.startsWith(`\\${keyString}`),
  );
};

export const getAuthorizationCodeAndRedirect = async (
  oAuthProvider: OAuthProvider,
) => {
  if (typeof window === "undefined") return;
  switch (oAuthProvider) {
    case "github": {
      const params = {
        client_id: OAuthProviderConstant[oAuthProvider].id,
        redirect_uri: `${frontendRootUrl}/oauth/login/callback/${oAuthProvider}`,
        scope: OAuthProviderConstant[oAuthProvider].scope.join(","),
        state: "nugurang", // TODO: insert state here
      };
      const query = Object.keys(params)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");
      window.location.assign(
        OAuthProviderConstant[oAuthProvider].getCodeUrl +
          (query ? `?${query}` : ""),
      );
      return;
    }
    default:
      break;
  }
};

export const getAccessToken = async (
  _oAuthProvider?: OAuthProvider,
  _oAuthAuthorizationCode?: string,
) => {
  const oAuthProvider: OAuthProvider =
    _oAuthProvider || (getCookies(null).oAuthProvider as OAuthProvider);
  const oAuthAuthorizationCode =
    _oAuthAuthorizationCode || getCookies(null).oAuthAuthorizationCode;
  switch (oAuthProvider) {
    case "github": {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: OAuthProviderConstant[oAuthProvider].id,
          client_secret: OAuthProviderConstant[oAuthProvider].secret,
          code: oAuthAuthorizationCode,
          redirect_uri: `${frontendRootUrl}/oauth/login/callback/github`,
        }),
      };
      const response = await fetch(
        OAuthProviderConstant[oAuthProvider].getAccessTokenUrl,
        options,
      );
      const {
        error,
        access_token: accessToken,
        token_type: tokenType,
        scope,
      } = await response.json();
      if (error) {
        console.error(error);
        return;
      } else {
        return accessToken;
      }
    }
    default:
      break;
  }
};