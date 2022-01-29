import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

interface CssProps {
  palette?: PaletteKey;
  css?: string;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const styledWrapCss = `
  ${(props: any) => `
    position: relative;
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.background.text};
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;
const StyledDivWrap = styled.div<StyledWrapProps>`${styledWrapCss}`;
const StyledButtonWrap = styled.button<StyledWrapProps>`${styledWrapCss}`;

const Card: NextPage<ComponentProps> = ({
  children,
  onClick,
  palette,
}) => {
  if (onClick) return (
    <StyledButtonWrap
      onClick={onClick}
      palette={palette}
    >
      { children }
    </StyledButtonWrap>
  );
  else return (
    <StyledDivWrap
      palette={palette}
    >
      { children }
    </StyledDivWrap>
  );
}

export default Card;
