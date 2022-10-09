import { setCookie } from '@/utilities/common/cookie';
import { login } from '@/utilities/backend';

export async function getServerSideProps(context) {
  const { oAuthProvider } = context.params;
  const { error } = context.query;

  if (error) {
    console.error(error);
    return {
      redirect: {
        permanent: false,
        destination: '/500',
      },
    };
  } else {
    switch (oAuthProvider) {
      case 'github':
        {
          const { code, state, provider } = context.query; // The temporary code will expire after 10 minutes. Visit https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
          const { jSessionId } = await login('github', code);
          setCookie(context, 'JSESSIONID', jSessionId);
        }
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
      default:
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
    }
  }
}

const OAuthLoginCallback = () => {
  return <></>;
};

export default OAuthLoginCallback;
