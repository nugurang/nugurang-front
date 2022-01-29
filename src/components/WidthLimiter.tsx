import type { NextPage } from 'next';
import React from 'react';
import type { ThemeObject } from '@/src/styles/theme';
import styled from 'styled-components';

interface ComponentProps {
  children?: React.ReactNode;
}

interface StyledWrapProps {
  theme: ThemeObject;
}

const StyledDivWidthLimiter = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    position: relative;
    margin: 0 auto;
    height: 100%;
    ${props.theme.screenSizeMediaQuery.gtMobile} {
      max-width: ${props.theme.screenSize.mobile};
    }
  `}
`;

const WidthLimiter: NextPage<ComponentProps> = ({ children }) => {
  return (
    <StyledDivWidthLimiter>
      { children }
    </StyledDivWidthLimiter>
  );
}

export default WidthLimiter;
