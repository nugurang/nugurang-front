import { GetServerSideProps, NextPage } from 'next';
import { getCurrentUserFromBackend, loginToBackend, registerToBackend } from '@/src/utils/backend';

import { getSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const callbackUrl = context.query.callbackUrl;
  const session = await getSession(context);

  await loginToBackend(context, session)
  const currentUser = await getCurrentUserFromBackend(context);
  if (!currentUser) {
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
