/* eslint-disable @typescript-eslint/ban-types */
import type { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCurrentOAuth2User } from '@/services/api/oAuth2User';
import { getCurrentUser } from '@/services/api/user';

export function WithAuthServerSideProps(getServerSidePropsFunction?: Function) {
  return async (context: GetServerSidePropsContext) => {
    const serverSideTranslationsResult = await serverSideTranslations(
      context.locale,
      ['common'],
    );
    try {
      await getCurrentOAuth2User(context);
    } catch (error) {
      if (error.networkError?.statusCode === 401) {
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
      if (getServerSidePropsFunction) {
        return await getServerSidePropsFunction({
          context,
          currentUser: currentUserResult.data,
          ...serverSideTranslationsResult,
        });
      }
      return {
        props: {
          currentUser: currentUserResult.data,
          ...serverSideTranslationsResult,
        },
      };
    } catch (error) {
      if (error.networkError?.statusCode === 401) {
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
    const serverSideTranslationsResult = await serverSideTranslations(
      context.locale,
      ['common'],
    );
    try {
      if (getServerSidePropsFunction) {
        return await getServerSidePropsFunction({
          context,
          ...serverSideTranslationsResult,
        });
      }
      return {
        props: {
          ...serverSideTranslationsResult,
        },
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
