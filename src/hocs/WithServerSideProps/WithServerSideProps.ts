import type { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCurrentOAuth2User } from '@/services/oAuthUser';
import { getCurrentUser } from '@/services/user';

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
      } else {
        return {
          redirect: {
            destination: '/500',
            permanent: false,
          },
        };
      }
    }

    try {
      const currentUserResult = await getCurrentUser(context);
      if (getServerSidePropsFunction) {
        return await getServerSidePropsFunction({
          context,
          currentUser: currentUserResult.data,
          ...serverSideTranslationsResult,
        });
      } else
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
      } else {
        console.error(error);
        return {
          redirect: {
            destination: '/signup',
            permanent: false,
          },
        };
      }
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
      } else
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
