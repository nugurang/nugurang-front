import Head from 'next/head'
import type { NextPage } from 'next'
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'

const DivStyle = styled.div`
  ${(props: any) => `
    background-color: ${props.theme.color.primary.main};
    color: white;
    font-size: 24px;
    border-radius: 4px;
    padding: 32px;
    text-align: center;
    ${props.theme.mediaQuery.isMobile} {
      background-color: ${props.theme.color.primary.dark};
    }
  `}
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
