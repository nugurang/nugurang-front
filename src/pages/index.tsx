export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: '/home',
    },
  };
}

function Index() {
  return <></>;
}

export default Index;
