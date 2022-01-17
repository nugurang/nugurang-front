import Head from 'next/head'
import type { NextPage } from 'next'
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

const DivStyle = styled.div`
  background-color: purple;
  font-size: 24px;
  border-radius: 4px;
  padding: 32px;
  text-align: center;
  ${(props: any) => props.theme.mediaQuery.isTablet} {
    color: white;
  }
`;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>nugurang</title>
        <meta name='title' content='nugurang' />
        <meta name='description' content='nugurang' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <DivStyle>
          <h3>Hello World</h3>
        </DivStyle>
      </main>
    </div>
  );
}

export default Home;
