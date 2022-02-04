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
  padding?: boolean;
  palette?: PaletteKey;
  variant?: VariantKeys;
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
    padding: ${props.padding !== false ? '0 8px' : '0'}
    
    color: ${props.theme.palette[props.palette || 'default'].text};
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
    
    ${fontFamily}
    ${props.css || ''}
  `}
`;

const Card: NextPage<ComponentProps> = ({
  children,
  className,
  css,
  padding,
  palette,
  variant
}) => {
  return (
    <StyledWrap
      className={className}
      css={css}
      padding={padding}
      palette={palette}
      variant={variant}
    >
      { children }
    </StyledWrap>
  );
}

export default Card;
