import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import { fontFamily } from '@/src/styles/preset';
import styled from '@emotion/styled';

interface CssProps {
  className?: string;
  css?: string;
  fullwidth?: boolean;
  palette?: PaletteKey;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledButtonWrap = styled.button<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: ${props.fullwidth ? 'block' : 'inline'};
    position: relative;
    width: ${props.fullwidth ? '100%' : 'auto'};
    border: 0px solid #000;
    border-radius: ${props.theme.borderRadius.round};
    color: ${props.theme.palette[`${props.palette || 'default'}`].text};
    background-color: ${props.theme.palette[props.palette || 'default'].main};
    padding: 10px 20px;
    cursor: pointer;
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
  onClick,
  onMouseEnter,
  onMouseLeave,
  palette
}) => {
  return (
    <StyledButtonWrap
      className={className}
      css={css}
      fullwidth={fullwidth}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      palette={palette}
    >
      { children }
      <StyledHoverEffectDiv />
    </StyledButtonWrap>
  );
}

export default Button;
