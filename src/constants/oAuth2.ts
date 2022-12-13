export type OAuth2Provider = 'github';
const github = {
  id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
  scope: ['read:user'],
  getCodePathname: "/api/oauth/github/authorize",
  getAccessTokenPathname: "/api/oauth/github/access_token",
}

const OAuth2Constants = {
  github
};

export default OAuth2Constants;
