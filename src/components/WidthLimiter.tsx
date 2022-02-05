import type { CommonProps, PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  maxWidth?: string;
}

interface StyledWrapProps extends CommonProps {
  maxWidth?: string;
}

const StyledDivWidthLimiter = styled(Div)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    margin: 0 auto;
    height: 100%;
    min-width: ${props.theme.screenPixelSize.watch}px;
    max-width: ${props.maxWidth ?? props.theme.screenPixelSize.desktop}px;
  `}
`;

const WidthLimiter: NextPage<ComponentProps> = props => {
  return (
    <StyledDivWidthLimiter
      className={props.className}
      maxWidth={props.maxWidth}
    >
      { props.children }
    </StyledDivWidthLimiter>
  );
}

export default WidthLimiter;
