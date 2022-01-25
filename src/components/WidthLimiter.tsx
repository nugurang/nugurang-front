import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

const StyledDivWidthLimiter = styled.div`
  ${(props: any) => `
    position: relative;
    margin: 0 auto;
    height: 100%;
    ${props.theme.mediaQuery.gtTablet} {
      max-width: ${props.theme.screenSize.minTablet};
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
