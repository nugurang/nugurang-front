import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

interface CssProps {
  css?: string;
  fullwidth?: boolean;
  palette?: PaletteKey;
  className?: string;
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
    width: ${props.fullwidth ? '100%' : 'auto'};
    border: 0px solid #000;
    border-radius: ${props.theme.borderRadius.round};
    color: ${props.theme.palette[`${props.palette || 'default'}`].text};
    background-color: ${props.theme.palette[props.palette || 'default'].main};
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: ${props.theme.palette[props.palette || 'default'].low};
    }
    transition-duration: 0.2s;
    transition-property: background-color, color;
    ${props.css || ''}
  `}
`;

const Button: NextPage<ComponentProps> = ({
  children,
  className,
  css,
  fullwidth,
  onClick,
  palette,
}) => {
  return (
    <StyledButtonWrap
      className={className}
      css={css}
      fullwidth={fullwidth}
      onClick={onClick}
      palette={palette}
    >
      { children }
    </StyledButtonWrap>
  );
}

export default Button;
