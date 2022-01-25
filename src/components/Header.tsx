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

const Header: NextPage = () => {
  return (
    <StyledHeaderWrap>
      <WidthLimiter>
        Header
      </WidthLimiter>
    </StyledHeaderWrap>
  );
}

export default Header;
