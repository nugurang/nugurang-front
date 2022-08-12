import { gql } from "@apollo/client";
import { query } from "@/utilities/backend";

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
    return {
      data: response.data.currentOAuth2User,
    };
  } else {
    return {
      error: response.error,
    };
  }
};
