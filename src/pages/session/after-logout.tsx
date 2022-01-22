import { GetServerSideProps, NextPage } from 'next';

import { destroyCookie } from '../../utils/cookie';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const callbackUrl = context.query.callbackUrl;
  destroyCookie(context, 'JSESSIONID', {
    path: '/'
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
