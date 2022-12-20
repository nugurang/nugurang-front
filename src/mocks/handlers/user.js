import { mockCurrentUserQuery } from '@/__generated__/resolvers-types';

export const currentUserQuery = mockCurrentUserQuery((req, res, ctx) => {
  return res(
    ctx.data({
      currentUser: {
        id: 'mockuser',
        oauth2Provider: 'mock',
        oauth2Id: 'mockuser',
        name: 'Mock User',
        email: 'mockuser@nugurang.com'
      },
    }),
  );
});
