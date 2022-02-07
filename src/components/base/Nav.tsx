import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import { CommonStyledAttributes } from '@/src/components/base/common';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {}

interface StyledComponentProps extends CommonStyledProps {}

const StyledNav = styled.nav<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const Nav: NextPage<ComponentProps> = React.forwardRef((props, ref) => {
  return (
    <StyledNav
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
    </StyledNav>
  );
});

export default Nav;
