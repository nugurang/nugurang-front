import withAuthServerSide from '../utils/withAuthServerSide';

export const getServerSideProps = withAuthServerSide(async () => {
  return {
    redirect: {
      destination: '/home/',
      permanent: false
    }
  };
})

export default function Index() {}
