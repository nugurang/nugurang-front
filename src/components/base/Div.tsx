import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import { CommonStyledAttributes } from '@/src/components/base/common';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {}

interface StyledComponentProps extends CommonStyledProps {}

const StyledDiv = styled.div<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const Div: NextPage<ComponentProps> = React.forwardRef((props, ref) => {
  return (
    <StyledDiv
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
    </StyledDiv>
  );
});

export default Div;
