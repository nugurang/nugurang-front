import { GetServerSideProps, NextPage } from 'next';

import { getSession } from 'next-auth/react';
import { loginToBackend } from '@/src/utils/backend';
import { logoutFromSession } from '@/src/utils/session';
import { useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const callbackUrl = context.query.callbackUrl;
  const session = await getSession(context);
  
  try {
  
    const loginToBackendResponse = await loginToBackend(context, session);
    if (loginToBackendResponse.hasOwnProperty('error')) throw new Error('Login to backend failed');
  
    return {
      redirect: {
        permanent: false,
        destination: callbackUrl,
      },
      props:{},
    };

  } catch (error) {
    // Logout browser session client-side
    return {
      props: {
        callbackUrl
      },
    };
  }

}

interface PageProps {
  callbackUrl: string,
}

const AfterLogin: NextPage<PageProps> = ({ callbackUrl }) => {
  useEffect (() => {
    logoutFromSession({ callbackUrl });
  }, [])
  return <></>;
};

export default AfterLogin;
