import { destroyCookie } from '@/utilities/common/cookie';

export async function getServerSideProps(context) {
  try {
    destroyCookie(context, 'JSESSIONID');
    destroyCookie(context, 'oAuthProvider');
    destroyCookie(context, 'oAuthAuthorizationCode');
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

const OAuthLogoutCallback = () => {
  return <></>;
};

export default OAuthLogoutCallback;
