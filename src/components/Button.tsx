import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import { fontFamily } from '@/src/styles/preset';
import styled from '@emotion/styled';

type VariantKeys = 'filled'
                 | 'outlined'
                 | 'transparent';

interface CssProps {
  className?: string;
  css?: string;
  fullwidth?: boolean;
  link?: boolean;
  palette?: PaletteKey;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  variant?: VariantKeys;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledButtonLikeAWrap = styled.button<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: inline-block;
    position: relative;
    overflow: hidden;
    border-radius: ${props.theme.borderRadius.round};
    &:visited {
      color: ${props.theme.palette[props.palette || 'transparent'].text};
    }
    &:active {
      transform: scale(0.9);
    }
    -webkit-transition: background-color 0.2s, transform 0.2s;
    transition: background-color 0.2s, transform 0.2s;
    ${fontFamily}
    ${props.css}
  `}
`;

const StyledButtonWrap = styled.button<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: ${props.fullwidth ? 'block' : 'inline'};
    position: relative;
    width: ${props.fullwidth ? '100%' : 'auto'};
    padding: 10px 20px;
    cursor: pointer;

    color: ${props.theme.palette[props.palette || 'transparent'].text};
    border-radius: ${props.theme.borderRadius.round};
    border: 1px solid #0000;
    background-color: ${props.theme.palette[props.palette || 'default'].main};
    ${props.variant == 'outlined' ? `
      border: 1px solid ${props.theme.palette[props.palette || 'default'].light};
      background-color: ${props.theme.palette.transparent.main};
    ` : ''};
    ${props.variant == 'transparent' ? `
      background-color: ${props.theme.palette.transparent.main};
    ` : ''};

    &:hover {
      background-color: ${props.theme.palette[props.palette || 'default'].dark};
    }
    &:active {
      transform: scale(0.9);
    }
    
    -webkit-transition: background-color 0.2s, transform 0.2s;
    transition: background-color 0.2s, transform 0.2s;
    ${fontFamily}
    ${props.css || ''}
  `}
`;

const StyledHoverEffectDiv = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: ${props.palette != 'transparent' ? 'none' : 'block'};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #0000;
    -webkit-transition: background-color 0.2s;
    transition: background-color 0.2s;
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
  link,
  onClick,
  onMouseEnter,
  onMouseLeave,
  palette,
  variant
}) => {
  if (link) return (
    <StyledButtonLikeAWrap
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
      <StyledHoverEffectDiv />
    </StyledButtonLikeAWrap>
  );
  else return (
    <StyledButtonWrap
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
      <StyledHoverEffectDiv />
    </StyledButtonWrap>
  );
}

export default Button;
