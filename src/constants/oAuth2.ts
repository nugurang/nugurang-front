import { frontendRootUrl } from './url';

export type OAuth2Provider = 'github';
export const OAuth2ProviderConstant = {
  github: {
    id: process.env.NEXT_PUBLIC_GITHUB_ID,
    secret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    scope: ['read:user'],
    getCodeUrl: `${frontendRootUrl}/api/oauth/github/authorize`,
    getAccessTokenUrl: `${frontendRootUrl}/api/oauth/github/access_token`,
  },
};
