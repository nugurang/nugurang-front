import { graphql } from 'msw'

export const mutationLogin = graphql.mutation('Login', (req, res, ctx) => {
  const { username } = req.variables
  sessionStorage.setItem('is-authenticated', username)
  return res(
    ctx.data({
      login: {
        username,
      },
    }),
  )
})

export const queryCurrentUser = graphql.query('CurrentUser', (req, res, ctx) => {
  const authenticatedUser = sessionStorage.getItem('is-authenticated')
  if (!authenticatedUser) {
    return res(
      ctx.errors([
        {
          message: 'Not authenticated',
          errorType: 'AuthenticationError',
        },
      ]),
    )
  }

  return res(
    ctx.data({
      user: {
        username: authenticatedUser,
        firstName: 'John',
      },
    }),
  )
})
