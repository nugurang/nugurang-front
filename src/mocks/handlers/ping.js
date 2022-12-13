import { graphql } from 'msw'

export const queryPing = graphql.query('Ping', (req, res, ctx) => {
  return res(
    ctx.data({
      pong: 'Pong!',
    }),
  )
})
