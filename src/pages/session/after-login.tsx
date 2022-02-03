import { GetServerSideProps, NextPage } from 'next';
import { parseHeaderSetCookie, setCookie } from '@/src/utils/cookie';

import { getSession } from 'next-auth/react';
import { logout } from '@/src/utils/session';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const callbackUrl = context.query.callbackUrl;
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: callbackUrl,
      },
      props: {},
    };
  }
  const getJSessionResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URL as string,
    },
    body: JSON.stringify({
      clientRegistrationId: session.provider,
      refreshToken: {
        tokenValue: session.accessToken,
        issuedAt: session.issued,
        expiresAt: session.expires,
      },
      accessToken: {
        tokenValue: session.accessToken,
        issuedAt: session.issued,
        expiresAt: session.expires,
        scopes: session.scopes,
      },
      additionalParameters: {}
    })
  });

  const setCookieRawString = getJSessionResponse.headers.get('set-cookie');
  if (!setCookieRawString) {
    return {
      props: {
        callbackUrl
      },
    };
  }

  const { JSESSIONID, Path } = parseHeaderSetCookie(setCookieRawString);
  setCookie({
    context,
    key: 'JSESSIONID', 
    value: JSESSIONID, 
    props: {
      maxAge: parseInt(process.env.COOKIE_MAX_AGE as string),
      path: Path,
    }
  });
  return {
    redirect: {
      permanent: false,
      destination: callbackUrl,
    },
    props:{},
  };

}

interface PageProps {
  callbackUrl: string,
}

const AfterLogin: NextPage<PageProps> = ({ callbackUrl }) => {
  useEffect (() => {
    logout(callbackUrl);
  }, [])
  return <></>;
};

export default AfterLogin;
