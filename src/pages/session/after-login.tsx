import { GetServerSideProps, NextPage } from 'next';
import { parseHeaderSetCookie, setCookie } from '@/src/utils/cookie';

import axios from 'axios';
import { getSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const callbackUrl = context.query.callbackUrl;
  const session = await getSession(context);
  try {
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
          'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_FRONTEND_URI as string,
        },
        withCredentials: true
      });
      const { JSESSIONID, Path } = parseHeaderSetCookie(getJSessionResponse.headers['set-cookie'])[0];
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
    } else throw new Error();
  } catch (error) {
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
}

const AfterLogin: NextPage = () => {
  return <></>;
};

export default AfterLogin;
