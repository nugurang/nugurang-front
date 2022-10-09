import { gql } from '@apollo/client';
import { query, mutate } from '@/utilities/backend';

export const getCurrentUser = async (context) => {
  const response = await query({
    query: gql`
      query CurrentUser {
        currentUser {
          id
          oauth2Provider
          oauth2Id
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
    const result = response.data.currentUser ?? {};

    if (result.oauth2Provider) {
      result.oAuth2Provider = result.oauth2Provider;
      delete result.oauth2Provider;
    }
    if (result.oauth2Id) {
      result.oAuth2Id = result.oauth2Id;
      delete result.oauth2Id;
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
