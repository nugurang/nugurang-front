import { GetServerSideProps, NextPage } from 'next';
import { parseHeaderSetCookie, setCookie } from '../../utils/cookie';

import axios from 'axios';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';

interface Props {
  callbackUrl: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  
  return {
    props: query,
  };

}

const AfterLogin: NextPage<Props> = ({ callbackUrl }) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  const getJSession = async (session: any) => {
    const getJSessionResponse = await axios({
      url: `/backend/login`,
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
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        additionalParameters: {}
      },
      withCredentials: true
    });
    const { JSESSIONID, path } = parseHeaderSetCookie(getJSessionResponse.headers['set-cookie'])[0];
    setCookie(null, 'JSESSIONID', JSESSIONID, {
      maxAge: 30 * 24 * 60 * 60,
      path,
    });
    return getJSessionResponse;
  }

  useEffect(() => {
    if (sessionStatus == 'authenticated') {
      getJSession(session);
      router.push(callbackUrl);
    }
  }, [sessionStatus]);

  return <></>;
};

export default AfterLogin;
