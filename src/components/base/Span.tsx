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

const StyledSpan = styled.span<CSSProps>`
  ${(props: CSSProps) => `
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
