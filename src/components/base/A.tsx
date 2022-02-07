import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import { CommonStyledAttributes } from '@/src/components/base/common';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  children?: React.ReactNode;
  href: string;
}

interface StyledComponentProps extends CommonStyledProps {}

const StyledA = styled.a<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const A: NextPage<ComponentProps> = React.forwardRef((props, ref) => {
  return (
    <StyledA
      className={props.className}
      css={props.css}
      ref={ref}

      ellipsis={props.ellipsis}
      enable={props.enable}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      palette={props.palette}
      variant={props.variant}

      href={props.href}
    >
      { props.children }
    </StyledA>
  );
});

export default A;
