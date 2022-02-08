import { mutate, query } from '@/src/backend/transaction';

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
    data: response.data?.currentOAuth2User ?? null,
    error: response.error ?? null
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
    data: response.data?.currentUser ?? null,
    error: response.error ?? null
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
    data: response.data?.createCurrentUser ?? null,
    error: response.error ?? null
  };
};
