import { Container } from "@/compositions/Container";
import { LoginForm } from "@/compositions/LoginForm";
import Link from "next/link";
import withAuthServerSideProps from "@/compositions/withAuthServerSideProps";

export const getServerSideProps = withAuthServerSideProps(
  async ({ context }) => {
    /*
      const currentUserResult = await queryToBackend({
        context,
        query: new GetCurrentUserQueryBuilder().withFollows().build(),
      });
    */
    return {
      props: {
        // currentUser: currentUserResult.data.currentUser,
      },
    };
  },
);

const Test = () => {
  return (
    <Container fixedWidth>
      <Link href="/home">GO HOME</Link>
      <LoginForm />
    </Container>
  );
};

export default Test;
