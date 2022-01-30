import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

interface CssProps {
  palette?: PaletteKey;
  className?: string;
  css?: string;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledDivWrap = styled.div<StyledWrapProps>`
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
const StyledButtonWrap = styled.button<StyledWrapProps>`
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

const Card: NextPage<ComponentProps> = ({
  children,
  className,
  onClick,
  palette,
}) => {
  return (
    <>
      {
        onClick && (
          <StyledButtonWrap
            className={className}
            onClick={onClick}
            palette={palette}
          >
            { children }
          </StyledButtonWrap>
        )
      }
      {
        !onClick && (
          <StyledDivWrap
            className={className}
            palette={palette}
          >
            { children }
          </StyledDivWrap>
        )
      }
    </>
  );
}

export default Card;
