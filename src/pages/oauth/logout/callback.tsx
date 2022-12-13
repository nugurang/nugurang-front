import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import CookieManager from '@/utilities/storage/cookie';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    CookieManager.delete(context, 'JSESSIONID');
    CookieManager.delete(context, 'oAuthProvider');
    CookieManager.delete(context, 'oAuthAuthorizationCode');
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}

function OAuthLogoutCallback() {
  return <></>;
}

export default OAuthLogoutCallback;
