import Head from 'next/head'
import { getPing } from '@/services/api/ping';
import { WithCheckOAuth2ServerSideProps, WithCheckOAuth2ServerSidePropsResponse } from '@/hocs/WithServerSideProps';
import { PlainObject } from '@/constants/common';

export const getServerSideProps = WithCheckOAuth2ServerSideProps(async({ context }) => {
  const responses: PlainObject = {};
  responses.ping = await getPing({ context });
  return {
    props: {
      ping: responses.ping.data
    }
  };
});

interface PageProps extends WithCheckOAuth2ServerSidePropsResponse {
  ping: string
}
export default (props: PageProps) => {
  const { ping } = props;
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js</a>
          <span> - {process.env.NEXT_PUBLIC_APP_MODE}!</span>
        </h1>
        <p>ping -&gt; {ping ?? 'error'}</p>
      </main>
    </div>
  )
};