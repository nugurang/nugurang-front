import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import { CommonStyledAttributes } from '@/src/components/base/common';
import React from 'react';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  children?: React.ReactNode;
  href: string;
}

interface StyledComponentProps extends CommonStyledProps {}

const StyledA = styled.a<StyledComponentProps>`
  ${(props: any) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const A: React.FC<ComponentProps> = props => {
  return (
    <StyledA
      className={props.className}
      css={props.css}

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
};

export default A;
