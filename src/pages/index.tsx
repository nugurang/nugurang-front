export async function getServerSideProps(context) {
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
