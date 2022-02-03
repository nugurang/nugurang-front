import type { NextPage } from 'next';
import React from 'react';
import type { ThemeObject } from '@/src/styles/theme';
import { fontFamily } from '@/src/styles/preset';
import styled from '@emotion/styled';

interface ComponentProps {
  className?: string;
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
    min-width: ${props.theme.screenSize.watch};
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      max-width: ${props.theme.screenSize.tablet};
    }
    ${fontFamily}
  `}
`;

const WidthLimiter: NextPage<ComponentProps> = ({
  children,
  className,
}) => {
  return (
    <StyledDivWidthLimiter
      className={className}
    >
      { children }
    </StyledDivWidthLimiter>
  );
}

export default WidthLimiter;
