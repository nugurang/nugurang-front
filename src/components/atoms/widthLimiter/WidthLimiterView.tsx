import type { CommonComponentProps, CommonStyledProps } from '@/components/common';

import Div from '@/components/quarks/div/Div';
import styled from '@emotion/styled';

interface ComponentProps extends CommonComponentProps {
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

const WidthLimiterView: React.FC<ComponentProps> = props => {
  return (
    <StyledDivWidthLimiter {...props} >
      { props.children }
    </StyledDivWidthLimiter>
  );
}

export default WidthLimiterView;
