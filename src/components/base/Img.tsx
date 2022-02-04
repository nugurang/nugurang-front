import { CommonProps, CommonStyledAttributes } from '@/src/components/base/common';
import type {
  PaletteKeys as ForwardedPaletteKeys,
  ThemeObject as ForwardedThemeObject
} from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

export type PaletteKeys = ForwardedPaletteKeys;
export type ThemeObject = ForwardedThemeObject;

interface ComponentProps extends CommonProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
}

interface CSSProps extends CommonProps {
  theme: ThemeObject;
}

const StyledImg = styled.img<CSSProps>`
  ${(props: CSSProps) => `
    ${CommonStyledAttributes(props)}

    object-fit: cover;
    height: 100%;
    width: 100%;
    vertical-align: top;
    
    ${props.css || ''}
  `}
`;

const Img: NextPage<ComponentProps> = React.forwardRef((props, ref) => {
  return (
    <StyledImg
      className={props.className}
      css={props.css}
      ref={ref}

      enable={props.enable}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}

      src={props.src}
      alt={props.alt ? props.alt : ''}
    />
  );
});

export default Img;
