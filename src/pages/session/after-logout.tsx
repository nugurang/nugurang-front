import { GetServerSideProps, NextPage } from 'next';

import { logoutFromBackend } from '@/src/utils/backend';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const callbackUrl = context.query.callbackUrl;
  
  await logoutFromBackend(context);

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
