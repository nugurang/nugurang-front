import type {
  PaletteKeys as ForwardedPaletteKeys,
  ThemeObject as ForwardedThemeObject
} from '@/src/styles/theme';

import { hexToRGB } from '@/src/utils/color';

// 테마로부터 포워딩
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

export interface CommonProps {
  className?: string;
  css?: string;

  acrylic?: boolean;
  ellipsis?: number;
  enable?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  palette?: PaletteKeys;
  variant?: VariantKeys;
}

interface CSSProps extends CommonProps {
  theme: ThemeObject;
}

export const CommonStyledAttributes = (props: CSSProps) => `
  font-family: 'Nanum Gothic', sans-serif;

  border: 0px solid #000;
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

  ${props.ellipsis == 1 ? `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  ` : ''}

  -webkit-transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);

  ${props.css ? props.css : ''}
`;
