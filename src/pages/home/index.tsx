import { Container } from "@/components/Container";
import { LoginForm } from "@/compositions/LoginForm";
import Link from "next/link";

const Home = () => {
  return (
    <Container determinate>
      <Link href="/home/test">GO TO TEST</Link>
      <LoginForm />
    </Container>
  );
};

export default Home;
