import { mockPingQuery } from '@/__generated__/resolvers-types';

export const pingQuery = mockPingQuery((req, res, ctx) => {
  return res(
    ctx.data({
      ping: 'Pong from mock server!',
    }),
  )
})
