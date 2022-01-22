import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

// Footer가 document 내부에서 자리할 공간을 확보하기 위한 더미 요소
const StyledDivDummy = styled.div`
  ${(props: any) => `
    height: 64px;
  `}
`;

const StyledFooterWrap = styled.footer`
  ${(props: any) => `
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props.theme.palette.background.sub};
    color: ${props.theme.palette.text.sub};
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

const Footer: NextPage = () => {
  return (
    <>
      <StyledDivDummy />
      <StyledFooterWrap>
        <StyledDivInnerWrap>
          Footer
        </StyledDivInnerWrap>
      </StyledFooterWrap>
    </>
  );
}

export default Footer;
