import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from 'styled-components';

const StyledHeaderWrap = styled.header`
  ${(props: any) => `
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.text.main};
    height: 64px;
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
