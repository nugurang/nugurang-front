import { deleteJSessionIdFromCookie, isJSessionIdExistFromCookie } from '@/src/utils/backend';

import GithubProvider from 'next-auth/providers/github';
import NextAuth from 'next-auth';
import { logoutFromSession } from '@/src/utils/session';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      name: 'github',
      clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
        token.type = account.type;
        token.accessToken = account.access_token;
        token.tokenType = account.token_type;
        token.scope = account.scope;
      }
      return token;
    },
    async session({ session, token }) {
      
      session.provider = token.provider;
      session.type = token.type;
      session.accessToken = token.accessToken;
      session.tokenType = token.tokenType;
      session.scopes = token.scope.split(',');
      if(token.iat) session.issued = new Date(token.iat * 1000).toISOString().slice(0,-5)+"Z";
      if(token.exp) session.expires = new Date(token.exp * 1000).toISOString().slice(0,-5)+"Z";

      // session 및 backend 로그인 상태 동기화
      if ( session && !isJSessionIdExistFromCookie(null)) logoutFromSession();
      if (!session &&  isJSessionIdExistFromCookie(null)) deleteJSessionIdFromCookie(null);
      
      return session;

    }
  }
})
