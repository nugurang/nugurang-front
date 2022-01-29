import { GetServerSideProps, NextPage } from 'next';

import { destroyCookie } from '@/src/utils/cookie';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const callbackUrl = context.query.callbackUrl;
  destroyCookie({
    context,
    key: 'JSESSIONID',
    props: {
      path: '/'
    }
  });
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
