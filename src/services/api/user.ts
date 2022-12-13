import { ApolloQueryResult, FetchResult, gql } from '@apollo/client';
import { query, mutate } from '@/utilities/network/graphQl';
import type { IsomorphicGetServerSidePropsContext } from '@/utilities/common/isomorphism';

export const getCurrentUser = async (
  context: IsomorphicGetServerSidePropsContext,
) => {
  const result: ApolloQueryResult<any> = await query(context, {
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
    dataPropertyName: 'currentUser',
  });
  console.log(result)
  if (result?.data?.oauth2Provider) {
    result.data.oAuth2Provider = result.data.oauth2Provider;
    delete result.data.oauth2Provider;
  }
  if (result?.data?.oauth2Id) {
    result.data.oAuth2Id = result.data.oauth2Id;
    delete result.data.oauth2Id;
  }
  return result;
};

interface CreateUserMutationProps {
  name: string;
  email: string;
  biography?: string;
}
export const createUser = async (
  context: IsomorphicGetServerSidePropsContext,
  variables: CreateUserMutationProps,
) => {
  const result: FetchResult<any> = await mutate(context, {
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
    dataPropertyName: 'createCurrentUser',
  });
  return result;
};
