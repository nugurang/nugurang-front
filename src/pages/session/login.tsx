import { GetServerSideProps, NextPage } from 'next';

import { signIn } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  return {
    props: query,
  };
}

interface Props {
  providerName: string;
  callbackUrl: string;
}

const Login: NextPage<Props> = ({ providerName, callbackUrl }) => {
  signIn(providerName, {
    callbackUrl: `/session/after-login?callbackUrl=${callbackUrl}`
  });
  return <></>;
};

export default Login;
