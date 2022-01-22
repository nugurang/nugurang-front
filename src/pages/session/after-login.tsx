import { GetServerSideProps, NextPage } from 'next';
import { parseHeaderSetCookie, setCookie } from '../../utils/cookie';

import axios from 'axios';
import { getSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const callbackUrl = context.query.callbackUrl;
  const session = await getSession(context);
  if (session) {
    const getJSessionResponse = await axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/login`,
      method: 'post',
      data: {
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
      },
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      withCredentials: true
    });
    const { JSESSIONID, Path } = parseHeaderSetCookie(getJSessionResponse.headers['set-cookie'])[0];
    console.log(JSESSIONID);
    console.log(Path);
    setCookie(context, 'JSESSIONID', JSESSIONID, {
      maxAge: 30 * 24 * 60 * 60,
      path: Path,
    });
    return {
      redirect: {
        permanent: false,
        destination: callbackUrl,
      },
      props:{},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: callbackUrl,
      },
      props:{},
    };
  }
}

const AfterLogin: NextPage = () => {
  return <></>;
};

export default AfterLogin;
