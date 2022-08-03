import { Container } from "@/compositions/Container";
import { LoginForm } from "@/compositions/LoginForm";
import Link from "next/link";

const Home = () => {
  return (
    <Container fixedWidth={true}>
      <Link href="/home/test">GO TO TEST</Link>
      <LoginForm />
    </Container>
  );
};

export default Home;
