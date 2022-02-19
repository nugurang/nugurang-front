import type { CommonComponentProps } from '@/components/common';
import { CommonStyledAttributes } from '@/components/common';
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
