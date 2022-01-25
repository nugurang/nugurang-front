import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
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
    color: ${props.theme.palette.background.sub};
    height: 64px;
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const StyledTextWrap = styled.div`
  ${(props: any) => `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${props.theme.palette.background.smallText};
  `}
`;

const Footer: NextPage = () => {
  return (
    <>
      <StyledDivDummy />
      <StyledFooterWrap>
        <WidthLimiter>
          <StyledTextWrap>
            &copy; nugurang. All rights reserved.
          </StyledTextWrap>
        </WidthLimiter>
      </StyledFooterWrap>
    </>
  );
}

export default Footer;
