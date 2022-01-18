import Head from 'next/head'
import type { NextPage } from 'next'
import client from "../utils/ApolloClient";
import { gql } from "@apollo/client";

// https://countries.trevorblades.com

interface Countries {
  name: string;
  code: string;
  emoji: string;
}

interface Props {
  countries: Countries[];
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries.slice(0, 4),
    },
  };
}

const GqlTest: NextPage<Props> = ({ countries }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          {countries.map((country) => (
            <div key={country.code}>
              <h3>{country.name}</h3>
              <p>
                {country.code} - {country.emoji}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default GqlTest;