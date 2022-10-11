import type { GetServerSidePropsContext } from 'next';
import { getCurrentOAuth2User } from '@/services/oAuthUser';
import { getCurrentUser } from '@/services/user';

export default function WithAuthServerSideProps(
  getServerSidePropsFunction?: Function,
) {
  return async (context: GetServerSidePropsContext) => {
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
        });
      } else
        return {
          props: {
            currentUser: currentUserResult.data,
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
