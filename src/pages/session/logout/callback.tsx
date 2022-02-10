import { GetServerSideProps, NextPage } from 'next';

import { logout as logoutFromBackend } from '@/src/backend/session';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const callbackUrl = context.query.callbackUrl;

  await logoutFromBackend(context);

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
