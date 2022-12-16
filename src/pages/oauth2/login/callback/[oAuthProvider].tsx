import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import CookieManager from '@/utilities/storage/cookie';
import { login } from '@/services/oAuth2/index';
import { OAuth2Provider } from '@/constants/oAuth2';
import Logger from '@/utilities/common/logger';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const oAuthProvider = context.params?.oAuthProvider as OAuth2Provider;
    const error = context.query.error;
    const code = context.query.code as string; // The temporary code will expire after 10 minutes. Visit https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps

    if (!oAuthProvider || error || !code) throw new Error();

    const loginResponse = await login(oAuthProvider, code);
    Logger.info(`Login successful: ${JSON.stringify(loginResponse.data.data)}`)
    const setCookieString = loginResponse.headers.get('set-cookie') ?? '';
    const jSessionId = CookieManager.parseAndGet(
      setCookieString,
      'JSESSIONID',
    );
    if(!jSessionId) throw new Error();
    CookieManager.set('JSESSIONID', jSessionId, { context });
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  } catch(error) {
    return {
      redirect: {
        permanent: false,
        destination: '/500',
      },
    };
  }
}

function oAuth2LoginCallback() {
  return <></>;
}

export default oAuth2LoginCallback;
