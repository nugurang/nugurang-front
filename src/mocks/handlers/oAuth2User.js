import { mockCurrentOAuth2UserQuery } from '@/__generated__/resolvers-types';

export const currentOAuth2UserQuery = mockCurrentOAuth2UserQuery((req, res, ctx) => {
  return res(
    ctx.data({
      currentOAuth2User: {
        id: 'Test',
        name: 'Test',
        email: 'Test@Test',
      },
    }),
  );
});
