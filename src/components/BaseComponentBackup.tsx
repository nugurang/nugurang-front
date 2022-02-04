import type {
  PaletteKeys as ForwardedPaletteKeys,
  ThemeObject as ForwardedThemeObject
} from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import { hexToRGB } from '@/src/utils/color';
import styled from '@emotion/styled';

export type PaletteKeys = ForwardedPaletteKeys;
export type ThemeObject = ForwardedThemeObject;

export type HTMLTagKeys = 'a'
                        | 'button'
                        | 'div'
                        | 'img'
                        | 'span';

export type VariantKeys = 'transparent'
                        | 'outlined'
                        | 'filled'
                        | 'acrylic';

interface CssProps {
  htmlTag: HTMLTagKeys;
  className?: string;
  css?: string;

  acrylic?: boolean;
  ellipsis?: number;
  enable?: boolean;
  href?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  palette?: PaletteKeys;
  variant?: VariantKeys;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledAttributes = (props: any) => `
  overflow: hidden;

  border: 1px solid #0000;
  border-radius: ${props.theme.borderRadius.round};

  background-color: ${props.theme.palette.transparent.main};
  color: ${props.theme.palette.transparent.text};
  ${props.variant == 'outlined' ? `
    border: 1px solid ${props.theme.palette[props.palette || 'default'].light};
  ` : ''}
  ${props.variant == 'filled' ? `
    background-color: ${props.theme.palette[props.palette || 'default'].main};
    color: ${props.theme.palette[props.palette || 'default'].text};
  ` : ''}
  ${props.variant == 'acrylic' ? `
    background-color: ${hexToRGB(props.theme.palette[props.palette || 'default'].main), 0.9}; // 아크릴 효과 fallback
    @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
      background-color: ${hexToRGB(props.theme.palette[props.palette || 'default'].main), 0.9};
      -webkit-backdrop-filter: blur(8px);
      backdrop-filter: blur(8px);
    };
    color: ${props.theme.palette[props.palette || 'default'].text};
  ` : ''}

  -webkit-transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);

  ${fontFamily}
  ${props.css ? props.css : ''}
`;

const StyledWrap = {
  a: styled.a<StyledWrapProps>`${(props: any) => StyledAttributes(props)}`,
  button: styled.button<StyledWrapProps>`${(props: any) => StyledAttributes(props)}`,
  div: styled(Div)<StyledWrapProps>`${(props: any) => StyledAttributes(props)}`,
  img: styled.img<StyledWrapProps>`${(props: any) => StyledAttributes(props)}`,
  span: styled.span<StyledWrapProps>`${(props: any) => StyledAttributes(props)}`,
}

const BaseComponent: NextPage<ComponentProps> = React.forwardRef(({
  children,
  className,
  css,
  htmlTag,

  acrylic = false,
  ellipsis = 0,
  enable = true,
  href = '',
  palette = 'default',
  onClick,
  onMouseEnter,
  onMouseLeave,
  variant = 'transparent'
}, ref) => {
  switch (htmlTag) {
    case 'a':
      return (
        <StyledWrap.a
          className={className}
          css={css}
          ref={ref}
    
          acrylic={acrylic}
          ellipsis={ellipsis}
          enable={enable}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          palette={palette}
          variant={variant}
          
          href={href}
        >
          { children }
        </StyledWrap.a>
      );
    case 'button':
      return (
        <StyledWrap.button
          className={className}
          css={css}
          ref={ref}
    
          acrylic={acrylic}
          ellipsis={ellipsis}
          enable={enable}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          palette={palette}
          variant={variant}
          
          onClick={onClick}
        >
          { children }
        </StyledWrap.button>
      );
    case 'div':
      return (
        <StyledWrap.div
          className={className}
          css={css}
          ref={ref}
    
          acrylic={acrylic}
          ellipsis={ellipsis}
          enable={enable}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          palette={palette}
          variant={variant}
        >
          { children }
        </StyledWrap.div>
      );
    case 'img':
      return (
        <StyledWrap.img
          className={className}
          css={css}
          ref={ref}
    
          acrylic={acrylic}
          ellipsis={ellipsis}
          enable={enable}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          palette={palette}
          variant={variant}
        >
          { children }
        </StyledWrap.img>
      );
    case 'span':
      return (
        <StyledWrap.span
          className={className}
          css={css}
          ref={ref}
    
          acrylic={acrylic}
          ellipsis={ellipsis}
          enable={enable}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          palette={palette}
          variant={variant}
        >
          { children }
        </StyledWrap.span>
      );
    default:
      return <>[HTMLTag required.]</>
  }
});

export default BaseComponent;
