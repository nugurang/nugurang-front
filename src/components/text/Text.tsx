import { useContext } from 'react';
import styled from '@emotion/styled';
import { PaletteKey, PaletteColorKey, ThemeContext, Theme } from '../theme';
import { TextAlignKey } from './common';

interface TextProps {
  theme?: Theme
  children?: string | null;
  align?: TextAlignKey;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
  css?: string;
}
const Text = styled.span<TextProps>`
  ${props => `
    ${(props.align ? `text-align: ${props.align};` : '')}
    color: ${props.theme.palette[props.palette ?? 'default'][props.paletteColor ?? 'text']};
    ${props.css ?? ''}
  `}
`;

interface Props {
  children?: string | null;
  align?: TextAlignKey;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
  css?: string;
}
export default (props: Props) => {
  const {
    children,
    align,
    palette,
    paletteColor,
    css,
  } = props;
  const { theme } = useContext(ThemeContext);
  
  return (
    <Text
      theme={theme}
      align={align}
      palette={palette}
      paletteColor={paletteColor}
      css={css}
    >
      {children}
    </Text>
  );
}
