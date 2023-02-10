import { useContext } from 'react';
import styled from '@emotion/styled';
import { PaletteKey, PaletteColorKey, ThemeContext } from '../theme';

type TextAlignKey = 'left' | 'right' | 'center';
type TextVariantKey = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export const getHtmlTagByVariant = (variant?: TextVariantKey) => {
  return styled[variant ?? 'span'] ?? styled.span;
}

interface Props {
  children?: string | null;
  align?: TextAlignKey;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
  variant?: TextVariantKey;
  css?: string;
}
export default (props: Props) => {
  const {
    children,
    align,
    palette,
    paletteColor,
    variant,
  } = props;
  const { theme } = useContext(ThemeContext);
  const TextHtmlTag = (getHtmlTagByVariant(variant))`
    ${(align ? `text-align: ${align};` : '')}
    color: ${theme.palette[palette ?? 'default'][paletteColor ?? 'text']};
    ${(() => {
      switch(variant) {
        case 'h1':
          return `
            font-size: 32px;
          `;
        case 'h2':
          return `
            font-size: 28px;
          `;
        case 'h3':
          return `
            font-size: 24px;
          `;
        case 'h4':
          return `
            font-size: 22px;
          `;
        case 'h5':
          return `
            font-size: 20px;
          `;
        case 'h6':
          return `
            font-size: 18px;
          `;
        case 'p':
          return `
            font-size: 16px;
          `;
        case 'span':
        default:
          return `
            font-size: 16px;
          `;
      }
    })()};
  `;
  
  return (
    <TextHtmlTag>
      {children ?? ''}
    </TextHtmlTag>
  );
}
