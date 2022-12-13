import Head from 'next/head'
import { useQuery, gql } from "@apollo/client";

const PING = gql`
  query Ping {
    ping {
      pong
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(PING);

  if (loading) {
    return <h2>로딩중</h2>;
  }

  if (error) {
    return <h1>에러 발생</h1>;
  }

  const pong = data?.ping.pong;
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
        <p>{pong}</p>
      </main>
    </div>
  )
}
