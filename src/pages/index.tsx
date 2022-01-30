import type { NextPage } from 'next';

export function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: '/home',
    },
    props: {}
  };
};

const Index: NextPage = () => {
  return <></>;
}

export default Index;
