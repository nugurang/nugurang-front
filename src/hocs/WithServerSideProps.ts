/* eslint-disable @typescript-eslint/ban-types */
import type { GetServerSidePropsContext } from 'next';
import { getCurrentOAuth2User } from '@/services/api/oAuth2User';
import { getCurrentUser } from '@/services/api/user';
import Logger from '@/utilities/common/logger';
import { AppError } from '@/constants/appError';
import { PlainObject } from '@/constants/common';

export function WithAuthServerSideProps(getServerSidePropsFunction?: Function) {
  return async (context: GetServerSidePropsContext) => {
    try {
      await getCurrentOAuth2User({ context });
    } catch (error) {
      if ((error as AppError).statusCode === 401) {
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
      const currentUserResult = await getCurrentUser({ context });
      if (getServerSidePropsFunction) {
        return await getServerSidePropsFunction({
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
      if ((error as AppError).statusCode === 401) {
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

export function WithDefaultServerSideProps(
  getServerSidePropsFunction?: Function,
) {
  return async (context: GetServerSidePropsContext) => {
    try {
      if (getServerSidePropsFunction) {
        return await getServerSidePropsFunction({
          context,
        });
      }
      return {
        props: {},
      };
    } catch(error) {
      Logger.error(error as PlainObject);
      return {
        redirect: {
          destination: '/500',
          permanent: false,
        },
      };
    }
  };
}
