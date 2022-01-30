import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { withAuthServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps('all', (context: any, props: any) => {
  return {
    props,
    redirect: {
      permanent: false,
      destination: '/home',
    }
  };
});

const Index: NextPage = () => {
  return <></>;
}

export default Index;
