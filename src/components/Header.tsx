import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const StyledHeaderWrap = styled.header`
  ${(props: any) => `
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.text.main};
    height: 64px;
  `}
`;

const StyledDivInnerWrap = styled.div`
  ${(props: any) => `
    margin: 0 auto;
    ${props.theme.mediaQuery.gtLaptop} {
      max-width: ${props.theme.screenSize.minLaptop};
    }
  `}
`;

const Header: NextPage = () => {
  return (
    <StyledHeaderWrap>
      <StyledDivInnerWrap>
        Header
      </StyledDivInnerWrap>
    </StyledHeaderWrap>
  );
}

export default Header;
