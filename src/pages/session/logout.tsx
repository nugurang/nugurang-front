import { GetServerSideProps, NextPage } from 'next';

import { signOut } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  return {
    props: query,
  };
}

interface PageProps {
  callbackUrl: string;
}

const Logout: NextPage<PageProps> = ({ callbackUrl }) => {
  signOut({
    callbackUrl: `/session/after-logout?callbackUrl=${callbackUrl}`
  });
  return <></>;
};

export default Logout;
