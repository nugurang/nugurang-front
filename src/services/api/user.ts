import { ApolloQueryResult, FetchResult, gql } from '@apollo/client';
import { query, mutate } from '@/utilities/network/graphQl';
import type { ApplicationQueryError } from '@/utilities/network/graphQl';
import ObjectManager from '@/utilities/common/object';
import AppErrors from '@/constants/appError';
import { GetServerSidePropsContextAdapter, PlainObject } from '@/constants/common';
import { OAuth2Provider } from '@/constants/oAuth2';
import { GraphQLError } from 'graphql';

export interface GetCurrentUserProps extends GetServerSidePropsContextAdapter {}
export interface GetCurrentUserResponse {
  data: {
    oAuth2Provider: OAuth2Provider;
    oAuth2Id: string;
    name: string;
    email: string;
    image?: {
      id: string;
      address: string;
    }
    biography?: string;
  }
}
export const getCurrentUser = async (props: GetCurrentUserProps = {}) => {
  try {
    const response: ApolloQueryResult<any> = await query({
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
      context: props.context
    });
    ObjectManager.replaceObjectProperty(response.data, 'oauth2Provider', 'oAuth2Provider');
    ObjectManager.replaceObjectProperty(response.data, 'oauth2Id', 'oAuth2Id');
    return {
      data: response.data
    };
  } catch(error) {
    if((error as ApplicationQueryError).statusCode === 401) {
      throw AppErrors.auth.UserNotExistError;
    } else if(
      ((error as ApplicationQueryError).graphQlErrors || [])
      .some((error: GraphQLError) => error.extensions.type === 'NotFoundException')
    ) {
      throw AppErrors.auth.UserNotExistError;
    } else {
      throw AppErrors.auth.LoginInternalError;
    }
  }
};

interface CreateUserMutationProps extends GetServerSidePropsContextAdapter {
  user: {
    name: string;
    email: string;
    biography?: string;
  }
}
export const createUser = async (props: CreateUserMutationProps) => {
  const response = await mutate({
    mutation: gql`
      mutation CreateUser($user: UserInput!) {
        createCurrentUser(user: $user) {
          id
        }
      }
    `,
    variables: {
      user: props.user,
    },
    dataPropertyName: 'createCurrentUser',
    context: props.context
  });
  return response ?? ({} as PlainObject);
};
