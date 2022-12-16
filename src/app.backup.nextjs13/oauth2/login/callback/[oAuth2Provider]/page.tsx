import { redirect } from 'next/navigation';
import { login } from '@/services/oAuth2/index';
import { OAuth2Provider } from '@/constants/oAuth2';

export default async ({ params, searchParams }) => {
  const oAuth2Provider = params.oAuth2Provider as OAuth2Provider;
  const error = searchParams.error;
  const code = searchParams.code; // The temporary code will expire after 10 minutes. Visit https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
  
  try {
    if (!oAuth2Provider || error || !code) throw new Error();
    
    const loginResponse = await login(oAuth2Provider, code);
    redirect('/');
    // cookies().set('JSESSIONID', loginResponse.jSessionId ?? '');
    // cookies().set('oAuthProvider', oAuth2Provider);
    // cookies().set('oAuthAuthorizationCode', code);
  } catch(error) {
    return <>로그인 실패</>;
  }
}
