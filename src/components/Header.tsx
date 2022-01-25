import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from 'styled-components';

const StyledHeaderWrap = styled.header`
  ${(props: any) => `
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.background.text};
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
    color: ${props.theme.palette.primary.main};
    font-size: 32px;
    font-weight: bold;
  `}
`;

const Header: NextPage = () => {
  return (
    <StyledHeaderWrap>
      <WidthLimiter>
        <StyledTextWrap>nugurang</StyledTextWrap>
      </WidthLimiter>
    </StyledHeaderWrap>
  );
}

export default Header;
