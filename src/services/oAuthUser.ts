import { gql } from '@apollo/client';
import { query } from '@/utilities/backend';

export const getCurrentOAuthUser = async (context) => {
  const response = await query({
    query: gql`
      query CurrentOAuth2User {
        currentOAuth2User {
          id
          name
          email
        }
      }
    `,
    context,
  });
  if (response?.data?.currentOAuth2User) {
    const result = response.data.currentOAuth2User ?? {};
    if (result.id) {
      result.oAuth2Provider = result.id;
      delete result.id;
    }

    return {
      data: result,
    };
  } else {
    return {
      error: response.error,
    };
  }
};
