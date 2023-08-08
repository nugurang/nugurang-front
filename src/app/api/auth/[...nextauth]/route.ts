import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import OAuth2Constants from '@/constants/oAuth2';
import type { OAuth2Provider } from '@/constants/oAuth2';
import OAuth2Service from '@/services/oAuth2';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: OAuth2Constants.providers['github'].id ?? '',
      clientSecret: OAuth2Constants.providers['github'].secret ?? '',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      console.log(`account: ${JSON.stringify(account)}`)

      const oAuth2Provider = (account?.provider ?? '') as OAuth2Provider;
      const accessToken = account?.access_token ?? '';
      // const loginResponse = await OAuth2Service.loginToBackend(oAuth2Provider, accessToken);
      // console.log(loginResponse)

      return true
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token) {
        session.accessToken = token.accessToken
      }
      return session
    },
  }
})

export { handler as GET, handler as POST }
