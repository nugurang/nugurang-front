import { GetServerSideProps, NextPage } from 'next';

import { destroyCookie } from '../../utils/cookie';
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
  callbackUrl: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  
  return {
    props: query,
  };

}

const AfterLogin: NextPage<Props> = ({ callbackUrl }) => {
  const router = useRouter();
  useEffect(() => {
    destroyCookie(null, 'JSESSIONID');
    router.push(callbackUrl);
  }, []);

  return <></>;
};

export default AfterLogin;
