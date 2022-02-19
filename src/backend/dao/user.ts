import { mutate, query } from '@/backend/transaction';

export const getCurrentOAuth2User = async (context: any) => {
  const response = await query(context, `
  query CurrentOAuth2User {
    currentOAuth2User {
      id
      name
      email
    }
  }`);
  return {
    data: response.data?.currentOAuth2User ?? null
  };
};

export const getCurrentUser = async (context: any) => {
  const response = await query(context, `
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
  `);
  return {
    data: response.data?.currentUser ?? null
  };
};

export interface CreateCurrentUserProps {
  name: string;
  email: string;
  biography: string;
  image?: number;
}
export const createCurrentUser = async (context: any, props: CreateCurrentUserProps) => {
  const response = await mutate(context, `
    mutation CreateCurrentUser($user: UserInput!) {
      createCurrentUser (user: $user) {
        id
      }
    }
  `, { user: props });
  return {
    data: response.data?.createCurrentUser ?? null
  };
};

export interface UpdateUserProps {
  name: string;
  email: string;
  biography: string;
  image?: number;
}
export const updateCurrentUser = async (context: any, props: UpdateUserProps) => {
  const response = await mutate(context, `
    mutation UpdateCurrentUser($user: UserInput!) {
      updateCurrentUser (user: $user) {
        id
      }
    }
  `, { user: props });
  return {
    data: response.data?.updateCurrentUser ?? null
  };
};
