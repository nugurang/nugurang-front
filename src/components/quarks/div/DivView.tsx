import type { CommonComponentProps } from '@/src/components/common';
import { CommonStyledAttributes } from '@/src/components/common';
import React from 'react';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {}

const StyledDiv = styled.div<ViewProps>`
  ${(props: any) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const DivView: React.FC<ViewProps> = React.forwardRef((props, ref) => {
  return (
    <StyledDiv
      {...props}
    >
      { props.children }
    </StyledDiv>
  );
});

export default DivView;
