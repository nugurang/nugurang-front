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
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledWrap = styled.div<StyledWrapProps>`
  ${(props: any) => `
    position: relative;
    background-color: ${props.theme.palette[props.palette || 'default'].main};
    color: ${props.theme.palette[props.palette || 'default'].text};
    ${fontFamily}
    ${props.css || ''}
  `}
`;

const Card: NextPage<ComponentProps> = ({
  children,
  className,
  css,
  palette,
}) => {
  return (
    <StyledWrap
      className={className}
      css={css}
      palette={palette}
    >
      { children }
    </StyledWrap>
  );
}

export default Card;
