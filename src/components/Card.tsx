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
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const styledWrap = `
  ${(props: any) => `
    position: relative;
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.background.text};
    transition-duration: 0.2s;
    transition-property: background-color, color;
    margin: 4px;
    padding: 20px;
  `}
`;
const StyledDivWrap = styled.div<StyledWrapProps>`${styledWrap}`;
const StyledButtonWrap = styled.button<StyledWrapProps>`${styledWrap}`;

const Card: NextPage<ComponentProps> = ({
  children,
  className,
  onClick,
  palette,
}) => {
  if (onClick) return (
    <StyledButtonWrap
      className={className}
      onClick={onClick}
      palette={palette}
    >
      { children }
    </StyledButtonWrap>
  );
  else return (
    <StyledDivWrap
      className={className}
      palette={palette}
    >
      { children }
    </StyledDivWrap>
  );
}

export default Card;
