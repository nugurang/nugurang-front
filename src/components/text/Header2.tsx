import { useContext } from 'react';
import styled from '@emotion/styled';
import { PaletteKey, PaletteColorKey, ThemeContext, Theme } from '../theme';
import { TextAlignKey } from './common';

interface Header2Props {
  theme?: Theme
  children?: string | null;
  align?: TextAlignKey;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
}
const Header2 = styled.h2<Header2Props>`
  ${props => `
    ${(props.align ? `text-align: ${props.align};` : '')}
    color: ${props.theme.palette[props.palette ?? 'default'][props.paletteColor ?? 'text']};
  
    font-size: 24px;
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
    <Header2
      theme={theme}
      align={align}
      palette={palette}
      paletteColor={paletteColor}
    >
      {children}
    </Header2>
  );
}
