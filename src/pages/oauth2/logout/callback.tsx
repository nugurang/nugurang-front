import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import CookieManager from '@/utilities/storage/cookie';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    CookieManager.delete('JSESSIONID', { context });
    CookieManager.delete('oAuthProvider', { context });
    CookieManager.delete('oAuthAuthorizationCode', { context });
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
