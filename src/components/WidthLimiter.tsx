import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const StyledDivWidthLimiter = styled.div`
  ${(props: any) => `
    position: relative;
    margin: 0 auto;
    height: 100%;
    ${props.theme.mediaQuery.gtMobile} {
      max-width: ${props.theme.size.screen.mobile};
    }
  `}
`;

const WidthLimiter: NextPage = ({ children }) => {
  return (
    <StyledDivWidthLimiter>
      { children }
    </StyledDivWidthLimiter>
  );
}

export default WidthLimiter;
