import GithubProvider from "next-auth/providers/github"
import NextAuth from "next-auth"

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
})
