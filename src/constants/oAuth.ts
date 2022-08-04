export type OAuthProvider = "github";
export const OAuthProviderConstant = {
  github: {
    id: process.env.NEXT_PUBLIC_GITHUB_ID,
    secret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    scope: ["read:user"],
    getCodeUrl: "https://github.com/login/oauth/authorize",
    getAccessTokenUrl: "https://github.com/login/oauth/access_token",
  },
};