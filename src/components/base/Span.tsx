import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import { CommonStyledAttributes } from '@/src/components/base/common';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {}

interface StyledComponentProps extends CommonStyledProps {}

const StyledSpan = styled.span<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const Span: NextPage<ComponentProps> = React.forwardRef((props, ref) => {
  return (
    <StyledSpan
      className={props.className}
      css={props.css}
      ref={ref}

      ellipsis={props.ellipsis}
      enable={props.enable}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      palette={props.palette}
      variant={props.variant}
    >
      { props.children }
    </StyledSpan>
  );
});

export default Span;
