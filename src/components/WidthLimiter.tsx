import type { NextPage } from 'next';
import React from 'react';
import type { ThemeObject } from '@/src/styles/theme';
import { fontFamily } from '@/src/styles/preset';
import styled from '@emotion/styled';

interface CssProps {
  maxWidth?: string;
}

interface ComponentProps extends CssProps {
  className?: string;
  children?: React.ReactNode;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledDivWidthLimiter = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    position: relative;
    margin: 0 auto;
    height: 100%;
    min-width: ${props.theme.screenSize.watch};
    max-width: ${props.maxWidth ?? props.theme.screenSize.desktop};
    ${fontFamily}
  `}
`;

const WidthLimiter: NextPage<ComponentProps> = ({
  children,
  className,
  maxWidth
}) => {
  return (
    <StyledDivWidthLimiter
      className={className}
      maxWidth={maxWidth}
    >
      { children }
    </StyledDivWidthLimiter>
  );
}

export default WidthLimiter;
