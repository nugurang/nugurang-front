import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { withServerSideProps } from '@/src/utils/server-side';

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any, props: any) => {
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
