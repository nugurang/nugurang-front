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
  onClick?: () => void;
}

interface CSSProps extends CommonProps {
  theme: ThemeObject;
}

const StyledButton = styled.button<CSSProps>`
  ${(props: CSSProps) => `
    ${CommonStyledAttributes(props)}
    
    position: relative;
    padding: 10px 20px;
    overflow: hidden;
    cursor: pointer;
    text-align: unset;

    &:hover {
      ${props.variant == 'filled' ? `
        background-color: ${props.theme.palette[props.palette || 'default'].dark};
      ` : ''}
    }
    &:visited {
      color: ${props.theme.palette.transparent.text};
      ${props.variant == 'filled' ? `
        color: ${props.theme.palette[props.palette || 'transparent'].text};
      ` : ''}
    }
    &:active {
      transform: scale(0.9);
    }
    
    ${props.css}
  `}
`;

const StyledHoverEffect = styled.div<CSSProps>`
  ${(props: CSSProps) => `
    display: ${props.palette ? 'none' : 'block'};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #0000;
    &:hover {
      background-color: #0002;
    }

    -webkit-transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
    transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  `}
`;

const Button: NextPage<ComponentProps> = React.forwardRef((props, ref) => {
  return (
    <StyledButton
      className={props.className}
      css={props.css}
      ref={ref}

      acrylic={props.acrylic}
      ellipsis={props.ellipsis}
      enable={props.enable}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      palette={props.palette}
      variant={props.variant ? props.variant : 'filled'}

      onClick={props.onClick}
    >
      { props.children }
      <StyledHoverEffect />
    </StyledButton>
  );
});

export default Button;
