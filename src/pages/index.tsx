import Head from "next/head";
import { Button } from "@/components/Button";
import { Textfield } from "@/components/Textfield";
import { Container } from "@/components/Container";

const Home = () => {
  return (
    <>
      <Head>
        <title>Emotion using the vanilla version supporting SSR</title>
      </Head>
      <Container determinate>
        <Button colorVariant="primary" fillingVariant="contained">
          Emotion Vanilla example
        </Button>
        <Textfield colorVariant="primary" />
      </Container>
    </>
  );
};

export default Home;
