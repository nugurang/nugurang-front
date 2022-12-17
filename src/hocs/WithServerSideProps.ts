/* eslint-disable @typescript-eslint/ban-types */
import type { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCurrentOAuth2User } from '@/services/api/oAuth2User';
import type { GetCurrentOAuth2UserResponse } from '@/services/api/oAuth2User';
import { getCurrentUser } from '@/services/api/user';
import type { GetCurrentUserResponse } from '@/services/api/user';
import Logger from '@/utilities/common/logger';
import { AppError } from '@/constants/appError';
import { GetServerSidePropsContextAdapter, PlainObject } from '@/constants/common';

const commonServerSidePropsResponse = Object.freeze({
  signin: {
    redirect: {
      destination: '/signin',
      permanent: false,
    },
  },
  signup: {
    redirect: {
      destination: '/signup',
      permanent: false,
    },
  },
  error: {
    redirect: {
      destination: '/500',
      permanent: false,
    },
  },
});
const defaultGetServerSidePropsFunction = (
  _: GetServerSidePropsContext,
  props: PlainObject = {}
) => ({ props });
export interface GetServerSideTranslationsResponseProps extends GetServerSidePropsContextAdapter {}
const getServerSideTranslationsResponse = async ({
  context
}: GetServerSideTranslationsResponseProps) => await serverSideTranslations(
  context?.locale ?? 'en',
  ['common', ...[context?.req?.url?.split('/')[1] ?? ''].filter(e => !!e)],
);

export interface WithCheckUserServerSidePropsResponse extends GetServerSidePropsContextAdapter {
  currentOAuth2User: GetCurrentOAuth2UserResponse,
  currentUser: GetCurrentUserResponse,
}
export function WithCheckUserServerSideProps(
  getServerSidePropsFunction: Function = defaultGetServerSidePropsFunction
) {
  return async (context: GetServerSidePropsContext) => {
    const responses: PlainObject = {};

    try {
      responses.translations = await getServerSideTranslationsResponse({ context });
    } catch (error) {
      return commonServerSidePropsResponse.error;
    }

    try {
      responses.oAuth2User = await getCurrentOAuth2User({ context });
    } catch (error) {
      if ((error as AppError).statusCode === 401) {
        return commonServerSidePropsResponse.signin;
      }
      return commonServerSidePropsResponse.error;
    }

    try {
      responses.user = await getCurrentUser({ context });
    } catch(error) {
      Logger.error(error as PlainObject);
      if ((error as AppError).statusCode === 401) {
        return commonServerSidePropsResponse.signup;
      }
      return commonServerSidePropsResponse.error;
    }

    return await getServerSidePropsFunction(context, {
      ...responses.translations,
      currentOAuth2User: responses.oAuth2User,
      currentUser: responses.user
    });
  };
}

export interface WithCheckOAuth2ServerSidePropsResponse extends GetServerSidePropsContextAdapter {
  currentOAuth2User: GetCurrentOAuth2UserResponse,
}
export function WithCheckOAuth2ServerSideProps(
  getServerSidePropsFunction: Function = defaultGetServerSidePropsFunction
) {
  return async (context: GetServerSidePropsContext) => {
    const responses: PlainObject = {};

    try {
      responses.translations = await getServerSideTranslationsResponse({ context });
    } catch (error) {
      return commonServerSidePropsResponse.error;
    }

    try {
      responses.oAuth2User = await getCurrentOAuth2User({ context });
    } catch(error) {
      Logger.error(error as PlainObject);
      if ((error as AppError).statusCode === 401) {
        return commonServerSidePropsResponse.signin;
      }
      return commonServerSidePropsResponse.error;
    }

    return await getServerSidePropsFunction(context, {
      ...responses.translations,
      currentOAuth2User: responses.oAuth2User
    });
  };
}

export function WithDefaultServerSideProps(
  getServerSidePropsFunction: Function = defaultGetServerSidePropsFunction,
) {
  return async (context: GetServerSidePropsContext) => {
    const responses: PlainObject = {};

    try {
      responses.translations = await getServerSideTranslationsResponse({ context });
    } catch (error) {
      return commonServerSidePropsResponse.error;
    }
  
    return await getServerSidePropsFunction(context, {
      ...responses.translations
    });
  };
}
