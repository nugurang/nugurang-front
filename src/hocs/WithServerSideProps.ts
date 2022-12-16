/* eslint-disable @typescript-eslint/ban-types */
import type { GetServerSidePropsContext } from 'next';
import { getCurrentOAuth2User, getCurrentOAuth2UserResponse } from '@/services/api/oAuth2User';
import { getCurrentUser, getCurrentUserResponse } from '@/services/api/user';
import Logger from '@/utilities/common/logger';
import { AppError } from '@/constants/appError';
import { GetServerSidePropsContextAdapter, PlainObject } from '@/constants/common';

export interface WithCheckUserServerSidePropsResponse extends GetServerSidePropsContextAdapter {
  currentOAuth2User: getCurrentOAuth2UserResponse,
  currentUser: getCurrentUserResponse,
}
export function WithCheckUserServerSideProps(getServerSidePropsFunction?: Function) {
  return async (context: GetServerSidePropsContext) => {
    const responses: PlainObject = {};
    try {
      responses.oAuth2User = await getCurrentOAuth2User({ context });
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
      responses.user = await getCurrentUser({ context });
      if (getServerSidePropsFunction) {
        return await getServerSidePropsFunction({
          context,
          currentOAuth2User: responses.oAuth2User,
          currentUser: responses.user
        });
      }
      return {
        props: {
          currentOAuth2User: responses.oAuth2User,
          currentUser: responses.user
        },
      };
    } catch(error) {
      if ((error as AppError).statusCode === 401) {
        return {
          redirect: {
            destination: '/signup',
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
  };
}

export interface WithCheckOAuth2ServerSidePropsResponse extends GetServerSidePropsContextAdapter {
  currentOAuth2User: getCurrentOAuth2UserResponse,
}
export function WithCheckOAuth2ServerSideProps(getServerSidePropsFunction?: Function) {
  return async (context: GetServerSidePropsContext) => {
    const responses: PlainObject = {};
    try {
      responses.oAuth2User = await getCurrentOAuth2User({ context });
      if (getServerSidePropsFunction) {
        return await getServerSidePropsFunction({
          context,
          currentOAuth2User: responses.oAuth2User
        });
      }
      return {
        props: {
          currentOAuth2User: responses.oAuth2User
        },
      };
    } catch(error) {
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
