import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

interface CssProps {
  css?: string;
  palette?: PaletteKey;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
  href?: string | object;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledButtonWrap = styled.button<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    border: 0px solid #000;
    border-radius: 4px;
    color: ${props.theme.palette[`${props.palette || 'default'}`].text};
    background-color: ${props.theme.palette[props.palette || 'default'].main};
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: ${props.theme.palette[props.palette || 'default'].dark};
    }
    ${props.css || ''}
  `}
`;

const Button: NextPage<ComponentProps> = ({
  children,
  css,
  onClick,
  palette,
}) => {
  return (
    <StyledButtonWrap
      css={css}
      onClick={onClick}
      palette={palette}
    >
      { children }
    </StyledButtonWrap>
  );
}

export default Button;
