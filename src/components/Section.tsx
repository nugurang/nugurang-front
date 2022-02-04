import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import { fontFamily } from '@/src/styles/preset';
import styled from '@emotion/styled';

interface CssProps {
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
    border-radius: ${props.theme.borderRadius.round};
    margin: 8px;
    padding: 8px;
    color: ${props.theme.palette[props.palette || 'background'].text};
    background-color: ${props.theme.palette[props.palette || 'background'].main};
    ${fontFamily}
    ${props.css || ''}
  `}
`;

const Section: NextPage<ComponentProps> = ({
  children,
  className,
  css,
  palette,
}) => {
  return (
    <StyledDivWrap
      className={className}
      css={css}
      palette={palette}
    >
      { children }
    </StyledDivWrap>
  );
}

export default Section;
