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
  href: string;
}

interface CSSProps extends CommonProps {
  theme: ThemeObject;
}

const StyledA = styled.a<CSSProps>`
  ${(props: CSSProps) => `
    ${CommonStyledAttributes(props)}
  `}
`;

const A: NextPage<ComponentProps> = React.forwardRef((props, ref) => {
  return (
    <StyledA
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

      href={props.href}
    >
      { props.children }
    </StyledA>
  );
});

export default A;
