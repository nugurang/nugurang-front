/* eslint-disable @typescript-eslint/ban-types */
import type { GetStaticPropsContext } from 'next';
import { getCurrentOAuth2User } from '@/services/api/oAuth2User';
import { getCurrentUser } from '@/services/api/user';
import { QueryError } from '@/utilities/network/graphQl';

export function WithAuthStaticProps(getStaticPropsFunction?: Function) {
  return async (context: GetStaticPropsContext) => {
    try {
      await getCurrentOAuth2User(context);
    } catch (error) {
      if ((error as QueryError)?.statusCode === 401) {
        return {
          redirect: {
            destination: '/signin',
            permanent: false,
          },
        };
      }
      return {
        redirect: {
          destination: '/500',
          permanent: false,
        },
      };
    }

    try {
      const currentUserResult = await getCurrentUser(context);
      if (getStaticPropsFunction) {
        return await getStaticPropsFunction({
          context,
          currentUser: currentUserResult.data,
        });
      }
      return {
        props: {
          currentUser: currentUserResult.data,
        },
      };
    } catch (error) {
      if ((error as QueryError)?.statusCode === 401) {
        return {
          redirect: {
            destination: '/signin',
            permanent: false,
          },
        };
      }
      return {
        redirect: {
          destination: '/signup',
          permanent: false,
        },
      };
    }
  };
}

export function WithDefaultStaticProps(getStaticPropsFunction?: Function) {
  return async (context: GetStaticPropsContext) => {
    try {
      if (getStaticPropsFunction) {
        return await getStaticPropsFunction({
          context,
        });
      }
      return {
        props: {},
      };
    } catch (error) {
      console.error(error);
      return {
        redirect: {
          destination: '/500',
          permanent: false,
        },
      };
    }
  };
}
