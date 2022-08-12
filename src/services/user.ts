import { gql } from "@apollo/client";
import { query, mutate } from "@/utilities/backend";

export const getCurrentUser = async (context) => {
  const response = await query({
    query: gql`
      query CurrentUser {
        currentUser {
          id
          oauth2Provider
          name
          email
          image {
            id
            address
          }
          biography
        }
      }
    `,
    context,
  });
  if (response?.data?.currentUser) {
    return {
      data: {
        ...response.data.currentUser,
        oauth2Provider: null,
        oAuthProvider: response.data.currentUser.oauth2Provider || null,
      },
    };
  } else {
    return {
      error: response.error,
    };
  }
};

export const createUser = async (context, variables) => {
  const response = await mutate({
    mutation: gql`
      mutation CreateUser($user: UserInput!) {
        createCurrentUser(user: $user) {
          id
        }
      }
    `,
    variables: {
      user: variables,
    },
    context,
  });
  if (response?.data?.createCurrentUser) {
    return {
      data: response.data.createCurrentUser,
    };
  } else {
    return {
      error: response.error,
    };
  }
};
