/* eslint-disable @typescript-eslint/ban-types */
import type { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCurrentOAuth2User } from '@/services/api/oAuth2User';
import type { OAuth2User } from '@/services/api/oAuth2User';
import { getCurrentUser } from '@/services/api/user';
import type { User } from '@/services/api/user';
import { GetServerSidePropsContextAdapter, PlainObject } from '@/constants/common';
import LoginRequiredError from '@/errors/network/LoginRequiredError';
import OAuth2UserNotExistError from '@/errors/network/OAuth2UserNotExistError';
import UserNotExistError from '@/errors/network/UserNotExistError';
import Logger from '@/utilities/common/logger';

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
  ['common', 'dev', ...([context?.resolvedUrl?.split('/')[1] ?? ''].filter(word => !!word))],
);

export interface WithCheckUserServerSidePropsResponse extends GetServerSidePropsContextAdapter {
  currentOAuth2User: OAuth2User,
  currentUser: User,
}
export function WithCheckUserServerSideProps(
  getServerSidePropsFunction: Function = defaultGetServerSidePropsFunction
) {
  return async (context: GetServerSidePropsContext) => {
    const responses: PlainObject = {};
    try {
      responses.translations = await getServerSideTranslationsResponse({ context });
      responses.oAuth2User = await getCurrentOAuth2User({ context });
      responses.user = await getCurrentUser({ context });
      return await getServerSidePropsFunction(context, {
        ...responses.translations,
        currentOAuth2User: responses.oAuth2User.data,
        currentUser: responses.user.data
      });
    } catch (error) {
      if (error instanceof LoginRequiredError) {
        return commonServerSidePropsResponse.signin;
      }
      if (error instanceof OAuth2UserNotExistError) {
        return commonServerSidePropsResponse.signin;
      }
      if (error instanceof UserNotExistError) {
        return commonServerSidePropsResponse.signup;
      }
      Logger.error(JSON.stringify(error));
      return commonServerSidePropsResponse.error;
    }
  };
}

export interface WithCheckOAuth2ServerSidePropsResponse extends GetServerSidePropsContextAdapter {
  currentOAuth2User: OAuth2User,
}
export function WithCheckOAuth2ServerSideProps(
  getServerSidePropsFunction: Function = defaultGetServerSidePropsFunction
) {
  return async (context: GetServerSidePropsContext) => {
    const responses: PlainObject = {};
    try {
      responses.translations = await getServerSideTranslationsResponse({ context });
      responses.oAuth2User = await getCurrentOAuth2User({ context });
      return await getServerSidePropsFunction(context, {
        ...responses.translations,
        currentOAuth2User: responses.oAuth2User.data,
      });
    } catch (error) {
      if (error instanceof LoginRequiredError) {
        return commonServerSidePropsResponse.signin;
      }
      if (error instanceof OAuth2UserNotExistError) {
        return commonServerSidePropsResponse.signin;
      }
      Logger.error(JSON.stringify(error));
      return commonServerSidePropsResponse.error;
    }
  };
}

export function WithDefaultServerSideProps(
  getServerSidePropsFunction: Function = defaultGetServerSidePropsFunction,
) {
  return async (context: GetServerSidePropsContext) => {
    try {
      const responses: PlainObject = {};
      responses.translations = await getServerSideTranslationsResponse({ context });
      return await getServerSidePropsFunction(context, {
        ...responses.translations
      });
    } catch (error) {
      Logger.error(JSON.stringify(error));
      return commonServerSidePropsResponse.error;
    }
  };
}
