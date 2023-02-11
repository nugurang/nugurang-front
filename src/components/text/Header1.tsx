import { useContext } from 'react';
import styled from '@emotion/styled';
import { PaletteKey, PaletteColorKey, ThemeContext, Theme } from '../theme';
import { TextAlignKey } from './common';

interface Header1Props {
  theme?: Theme
  children?: string | null;
  align?: TextAlignKey;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
}
const Header1 = styled.h1<Header1Props>`
  ${props => `
    ${(props.align ? `text-align: ${props.align};` : '')}
    color: ${props.theme.palette[props.palette ?? 'default'][props.paletteColor ?? 'text']};
  
    font-size: 28px;
    font-weight: bold;
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
  } = props;
  const { theme } = useContext(ThemeContext);
  
  return (
    <Header1
      theme={theme}
      align={align}
      palette={palette}
      paletteColor={paletteColor}
    >
      {children}
    </Header1>
  );
}
