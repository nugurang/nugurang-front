import { GetServerSideProps, NextPage } from 'next';
import { parseHeaderSetCookie, setCookie } from '@/src/utils/cookie';

import axios from 'axios';
import { getSession } from 'next-auth/react';

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
  const getJSessionResponse = await fetch(`${process.env.BACKEND_URI}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': process.env.FRONTEND_URI as string,
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
      redirect: {
        permanent: false,
        destination: `/session/logout?callbackUrl=${callbackUrl}`,
      },
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

const AfterLogin: NextPage = () => {
  return <></>;
};

export default AfterLogin;
