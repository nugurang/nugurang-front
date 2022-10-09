import type { GetServerSidePropsContext } from 'next';
import { getCurrentOAuthUser } from '@/services/oAuthUser';
import { getCurrentUser } from '@/services/user';

export default function WithAuthServerSideProps(
  getServerSidePropsFunction?: Function,
) {
  return async (context: GetServerSidePropsContext) => {
    const currentOAuth2UserResult = await getCurrentOAuthUser(context);
    console.log(currentOAuth2UserResult);
    if (!currentOAuth2UserResult.data) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      };
    }

    const currentUserResult = await getCurrentUser(context);

    if (!currentUserResult?.data) {
      return {
        redirect: {
          destination: '/signup',
          permanent: false,
        },
      };
    }

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
  };
}
