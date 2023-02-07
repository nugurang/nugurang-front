import { ApolloQueryResult, gql } from '@apollo/client';
import { queryToBackend, mutateToBackend } from '@/utilities/network/graphQl';
import ObjectManager from '@/utilities/common/object';
import { GetServerSidePropsContextAdapter } from '@/constants/common';
import { OAuth2Provider } from '@/constants/oAuth2';
import UserAlreadyExistsError from '@/errors/network/UserAlreadyExistsError';
import UserNotExistError from '@/errors/network/UserNotExistError';

export interface GetCurrentUserProps extends GetServerSidePropsContextAdapter {}
interface GetCurrentUserResponseRawData {
  oauth2Provider: OAuth2Provider;
  oauth2Id: string;
  name: string;
  email: string;
  image?: {
    id: string;
    address: string;
  }
  biography?: string;
}
export interface User {
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
export interface GetCurrentUserResponse {
  data: User
}
export const getCurrentUser = async (props: GetCurrentUserProps = {}) => {
  const response: ApolloQueryResult<any> = await queryToBackend({
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
    context: props.context
  });
  if(Array.isArray(response.errors) && response.errors[0]?.extensions.type === 'NotFoundException') {
    throw new UserNotExistError;
  }
  ObjectManager.replaceObjectProperty(response.data.currentUser, 'oauth2Provider', 'oAuth2Provider');
  ObjectManager.replaceObjectProperty(response.data.currentUser, 'oauth2Id', 'oAuth2Id');
  return {
    data: response.data.currentUser
  };
};

interface CreateUserMutationProps extends GetServerSidePropsContextAdapter {
  user: {
    name: string;
    email: string;
    biography?: string;
  }
}
export const createUser = async (props: CreateUserMutationProps) => {
  const response = await mutateToBackend({
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
    context: props.context
  });
  if(Array.isArray(response.errors?.graphQLErrors) && response.error?.graphQLErrors[0]?.extensions.type === 'DataIntegrityViolationException') {
    throw new UserAlreadyExistsError;
  }
  return {
    data: response.data.createCurrentUser
  };
};
