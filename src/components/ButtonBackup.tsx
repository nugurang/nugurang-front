import type { PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

type VariantKeys = 'filled'
                 | 'outlined'
                 | 'transparent';

interface CssProps {
  className?: string;
  css?: string;
  fullwidth?: boolean;
  palette?: PaletteKeys;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant?: VariantKeys;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
}

interface StyledProps extends CssProps {
  theme: ThemeObject;
}

const StyledButton = styled(BaseComponent)<StyledProps>`
  ${(props: StyledProps) => `
    position: relative;
    padding: 10px 20px;
    overflow: hidden;
    cursor: pointer;

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

const StyledHoverEffect = styled(BaseComponent)<StyledProps>`
  ${(props: StyledProps) => `
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
  `}
`;

const Button: NextPage<ComponentProps> = ({
  children,
  className,
  css,
  fullwidth,
  onClick,
  onMouseEnter,
  onMouseLeave,
  palette,
  variant
}) => {
  return (
    <StyledButton
      htmlTag='button'
      className={className}
      css={css}
      fullwidth={fullwidth}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      palette={palette}
      variant={variant}
    >
      { children }
      <StyledHoverEffect htmlTag='div' />
    </StyledButton>
  );
}

export default Button;
