import { CommonProps, CommonStyledAttributes } from '@/src/components/base/common';
import type {
  PaletteKeys as ForwardedPaletteKeys,
  ThemeObject as ForwardedThemeObject
} from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

export type PaletteKeys = ForwardedPaletteKeys;
export type ThemeObject = ForwardedThemeObject;

interface ComponentProps extends CommonProps {
  children?: React.ReactNode;
}

interface CSSProps extends CommonProps {
  theme: ThemeObject;
}

const StyledUl = styled.ul<CSSProps>`
  ${(props: CSSProps) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const Ul: NextPage<ComponentProps> = React.forwardRef((props, ref) => {
  return (
    <StyledUl
      className={props.className}
      css={props.css}
      ref={ref}

      acrylic={props.acrylic}
      ellipsis={props.ellipsis}
      enable={props.enable}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      palette={props.palette}
      variant={props.variant}
    >
      { props.children }
    </StyledUl>
  );
});

export default Ul;