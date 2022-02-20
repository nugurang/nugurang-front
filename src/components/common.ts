import type {
  CornerKeys as ForwardedCorderKeys,
  PaletteKeys as ForwardedPaletteKeys,
  ThemeObject as ForwardedThemeObject
} from '@/styles/theme';

import { hexToRGB } from '@/utils/color';

// 테마 파일로부터 포워딩
export type CornerKeys = ForwardedCorderKeys;
export type PaletteKeys = ForwardedPaletteKeys;
export type ThemeObject = ForwardedThemeObject;

export type VariantKeys = 'transparent'
                        | 'outlined'
                        | 'filled'
                        | 'acrylic';

export interface CommonComponentProps {
  className?: string;
  css?: string;
  children?: React.ReactNode;

  ellipsis?: number;
  enable?: boolean;
  palette?: PaletteKeys;
  variant?: VariantKeys;
  corner?: CornerKeys;
  
  onClick?: () => void;
  onChange?: () => void;
  onInput?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface CommonStyledProps extends CommonComponentProps {}

export const CommonStyledAttributes = (props: any) => `
  font-family: ${props.theme.font.default};
  background-color: ${props.theme.palette.transparent.main};
  color: ${props.theme.palette.transparent.text};

  border: 0px solid #000;
  ${props.variant == 'outlined' ? `
    border: 1px solid ${props.theme.palette[props.palette || 'default'].light};
  ` : ''}
  ${props.variant == 'filled' ? `
    background-color: ${props.theme.palette[props.palette || 'default'].main};
    color: ${props.theme.palette[props.palette || 'default'].text};
  ` : ''}
  /*
    ${props.variant == 'acrylic' ? `
      background-color: ${hexToRGB(props.theme.palette[props.palette || 'default'].main), 0.9}; // 아크릴 효과 fallback
      @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
        background-color: ${hexToRGB(props.theme.palette[props.palette || 'default'].main), 0.9};
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
      }
      color: ${props.theme.palette[props.palette || 'default'].text};
    ` : ''}
  */
 
  border-radius: 0px;
  ${props.corner == 'square' ? `
    border-radius: ${props.theme.corner.square};
  ` : ''}
  ${props.corner == 'round' ? `
    border-radius: ${props.theme.corner.round};
  ` : ''}
  ${props.corner == 'circle' ? `
    border-radius: ${props.theme.corner.circle};
  ` : ''}

  ${props.ellipsis === 1 ? `
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  ` : ''}

  -webkit-transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);

  ${props.css ? props.css : ''}
`;
