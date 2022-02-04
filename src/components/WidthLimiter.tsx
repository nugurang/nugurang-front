import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import React from 'react';
import type { ThemeObject } from '@/src/styles/theme';
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

const StyledDivWidthLimiter = styled(Div)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    margin: 0 auto;
    height: 100%;
    min-width: ${props.theme.screenSize.watch};
    max-width: ${props.maxWidth ?? props.theme.screenSize.desktop};
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
