import type { CommonComponentProps } from '@/components/common';
import { CommonStyledAttributes } from '@/components/common';
import React from 'react';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {}

const StyledSpan = styled.span<ViewProps>`
  ${(props: any) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const SpanView: React.FC<ViewProps> = props => {
  return (
    <StyledSpan
      {...props}
    >
      { props.children }
    </StyledSpan>
  );
};

export default SpanView;
