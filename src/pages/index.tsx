export async function getServerSideProps() {
  return {
    redirect: {
      permanent: false,
      destination: '/home',
    },
  };
}

export default () => {
  return <></>;
};
