export type OAuth2Provider = 'github';

const csrfState = process.env.NEXT_PUBLIC_OAUTH2_CSRF_STATE ?? '';
const OAuth2CommonConstants = {
  csrfState
};

const github = {
  id: process.env.NEXT_PUBLIC_OAUTH2_GITHUB_CLIENT_ID,
  secret: process.env.NEXT_PUBLIC_OAUTH2_GITHUB_CLIENT_SECRET,
  scope: ['read:user'],
  getCodePathname: "/api/oauth2/github/authorize",
  getAccessTokenPathname: "/api/oauth2/github/access_token",
}
const OAuth2ProviderConstants = {
  github
};

const OAuth2Constants = {
  common: OAuth2CommonConstants,
  providers: OAuth2ProviderConstants
};

export default OAuth2Constants;
