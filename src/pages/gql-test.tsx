import Head from 'next/head'
import { NextPage } from 'next'
import { queryToBackend } from '@/src/utils/backend';

interface CurrentOAuth2User {
  id: string;
  name: string;
  email: string;
}

interface Props {
  currentOAuth2User: CurrentOAuth2User;
}

export async function getServerSideProps(context: any) {
  const { data } = await queryToBackend(context, `
    query CurrentOAuth2User {
      currentOAuth2User {
        id
        name
        email
      }
    }
  `);

  return {
    props: {
      currentOAuth2User: data.currentOAuth2User,
    },
  };
}

const GqlTest: NextPage<Props> = ({ currentOAuth2User }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <h1>{currentOAuth2User.id}</h1>
          <h2>{currentOAuth2User.name}</h2>
          <h2>{currentOAuth2User.email}</h2>
        </div>
      </main>
    </div>
  );
}

export default GqlTest;
