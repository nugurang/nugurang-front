import Footer from './Footer';
import Header from './Header';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const StyledDivWrap = styled.div`
  ${(props: any) => `
    position: relative;
    background-color: ${props.theme.color.background};
    color: ${props.theme.color.text};
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
    <StyledDivWrap>
      <Header />
      <StyledMainContainer>
        { children }
      </StyledMainContainer>
      <Footer />
    </StyledDivWrap>
  );
}

export default Wrap;
