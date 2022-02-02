import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import { hexToRGB } from '@/src/utils/color';
import styled from '@emotion/styled';

interface CssProps {
  acrylic?: boolean;
  className?: string;
  css?: string;
  palette?: PaletteKey;
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
    background-color: ${props.theme.palette[props.palette || 'background'].main};
    color: ${props.theme.palette[props.palette || 'background'].text};
    margin: 4px;
    padding: 20px;
    ${props.acrylic ? `
      background-color: ${hexToRGB(props.theme.palette[props.palette || 'background'].main, 0.75)};
      @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
        background-color: ${hexToRGB(props.theme.palette[props.palette || 'background'].main, 0.75)};
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }
    ` : ''}
    ${props.css || ''}
  `}
`;
const StyledButtonWrap = styled.button<StyledWrapProps>`
  ${(props: any) => `
    position: relative;
    background-color: ${props.theme.palette[props.palette || 'background'].main};
    color: ${props.theme.palette[props.palette || 'background'].text};
    margin: 4px;
    padding: 20px;
    ${props.acrylic ? `
      background-color: ${hexToRGB(props.theme.palette[props.palette || 'background'].main, 0.75)};
      @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
        background-color: ${hexToRGB(props.theme.palette[props.palette || 'background'].main, 0.75)};
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }
    ` : ''}
    ${props.css || ''}
  `}
`;

const Card: NextPage<ComponentProps> = ({
  acrylic,
  children,
  className,
  css,
  onClick,
  palette,
}) => {
  return (
    <>
      {
        onClick && (
          <StyledButtonWrap
            acrylic={acrylic}
            className={className}
            css={css}
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
            acrylic={acrylic}
            className={className}
            css={css}
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
