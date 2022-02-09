import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  maxWidth?: number;
}

interface StyledComponentProps extends CommonStyledProps {
  maxWidth?: number;
}

const StyledDivWidthLimiter = styled(Div)<StyledComponentProps>`
  ${(props: any) => `
    position: relative;
    margin: 0 auto;
    height: 100%;
    min-width: ${props.theme.screenPixelSize.watch}px;
    max-width: ${props.maxWidth ?? props.theme.screenPixelSize.laptop}px;
  `}
`;

const WidthLimiter: React.FC<ComponentProps> = props => {
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
