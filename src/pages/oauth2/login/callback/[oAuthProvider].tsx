import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import EnvConstants from '@/constants/env';
import { OAuth2Provider } from '@/constants/oAuth2';
import { login } from '@/services/oAuth2/index';
import Logger from '@/utilities/common/logger';
import CookieManager from '@/utilities/storage/cookie';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  if(EnvConstants.isAppModeMock) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  try {
    const oAuthProvider = context.params?.oAuthProvider as OAuth2Provider;
    const error = context.query.error;
    const code = context.query.code as string; // The temporary code will expire after 10 minutes. Visit https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps

    if (!oAuthProvider || error || !code) throw new Error();

    const loginResponse = await login(oAuthProvider, code);
    Logger.info(`Login successful: ${JSON.stringify(loginResponse.data.data.email)}`)
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

export default () => {
  return (
    <></>
  );
};
