import { GetServerSideProps, NextPage } from 'next';

import { getCurrentUser } from '@/backend/dao/user';
import { getSession } from 'next-auth/react';
import { login as loginToBackend } from '@/backend/session';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const callbackUrl = context.query.callbackUrl;
  const session = await getSession(context);

  await loginToBackend(context, session);
  const currentUserResponse = await getCurrentUser(context);
  if (!currentUserResponse.data) {
    return {
      redirect: {
        permanent: false,
        destination: `/session/register?callbackUrl=${callbackUrl}`,
      },
      props: {},
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: callbackUrl,
    },
    props: {},
  };

}

const Callback: NextPage = () => {
  return <></>;
};

export default Callback;
