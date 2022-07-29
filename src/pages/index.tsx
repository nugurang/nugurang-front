import Head from "next/head";
import { Button } from "@/components/Button";

const Home = () => {
  return (
    <>
      <Head>
        <title>Emotion using the vanilla version supporting SSR</title>
      </Head>
      <div>
        <Button>Emotion Vanilla example</Button>
      </div>
    </>
  );
};

export default Home;
