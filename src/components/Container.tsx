import Footer from './Footer';
import Head from 'next/head';
import Header from './Header';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const StyledDivWrap = styled.div`
  ${(props: any) => `
    position: relative;
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.text.main};
    min-height: 100%;
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const StyledMainContainer = styled.main`
  ${(props: any) => `
    position: relative;
    margin: 0 auto;
    ${props.theme.mediaQuery.gtLaptop} {
      max-width: ${props.theme.screenSize.minLaptop};
    }
  `}
`;

const Wrap: NextPage = ({ children }) => {
  return (
    <>
      <Head>
        <title>nugurang</title>
        <meta name='title' content='nugurang' />
        <meta name='description' content='nugurang' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <StyledDivWrap>
        <Header />
        <StyledMainContainer>
          { children }
        </StyledMainContainer>
        <Footer />
      </StyledDivWrap>
    </>
  );
}

export default Wrap;
