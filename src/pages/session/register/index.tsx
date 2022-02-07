import { GetServerSideProps, NextPage } from 'next';
import { loginToBackend, registerToBackend } from '@/src/utils/backend';

import { getSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const callbackUrl = context.query.callbackUrl;
  const session = await getSession(context);

  await registerToBackend(context, session);
  await loginToBackend(context, session);

  return {
    redirect: {
      permanent: false,
      destination: callbackUrl,
    },
    props: {},
  };

}

const RegisterIndex: NextPage = () => {
  return <></>;
};

export default RegisterIndex;