import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import CookieManager from '@/utilities/storage/cookie';
import { login } from '@/services/oAuth2/index';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { oAuthProvider } = context.params;
  const { error } = context.query;

  if (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/500',
      },
    };
  }
  {
    const { code } = context.query; // The temporary code will expire after 10 minutes. Visit https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
    const { jSessionId } = await login(oAuthProvider, code);
    CookieManager.set(context, 'JSESSIONID', jSessionId);
  }
  return {
    redirect: {
      permanent: false,
      destination: '/',
    },
  };
}

function OAuthLoginCallback() {
  return <></>;
}

export default OAuthLoginCallback;
