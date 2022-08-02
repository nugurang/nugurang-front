export async function getServerSideProps(context) {
  return {
    redirect: {
      permanent: false,
      destination: "/home",
    },
  };
}

const Index = () => {
  return <></>;
};

export default Index;
