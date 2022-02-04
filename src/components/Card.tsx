import type { PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import React from 'react';
import type { VariantKeys } from '@/src/components/base/common';
import styled from '@emotion/styled';

interface CssProps {
  className?: string;
  css?: string;
  palette?: PaletteKeys;
  variant?: VariantKeys;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
}

interface StyledProps extends CssProps {
  theme: ThemeObject;
}

const StyledDiv = styled(Div)<StyledProps>`
  ${(props: any) => `
    ${props.css || ''}
  `}
`;

const Card: NextPage<ComponentProps> = ({
  children,
  className,
  css,
  palette,
  variant
}) => {
  return (
    <StyledDiv
      className={className}
      css={css}
      palette={palette}
      variant={variant}
    >
      { children }
    </StyledDiv>
  );
}

export default Card;
