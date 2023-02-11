import { useContext } from 'react';
import styled from '@emotion/styled';
import { PaletteKey, PaletteColorKey, ThemeContext, Theme } from '../theme';
import { TextAlignKey } from './common';

interface Header3Props {
  theme?: Theme
  children?: string | null;
  align?: TextAlignKey;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
}
const Header3 = styled.h3<Header3Props>`
  ${props => `
    ${(props.align ? `text-align: ${props.align};` : '')}
    color: ${props.theme.palette[props.palette ?? 'default'][props.paletteColor ?? 'text']};
  
    font-size: 20px;
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
    <Header3
      theme={theme}
      align={align}
      palette={palette}
      paletteColor={paletteColor}
    >
      {children}
    </Header3>
  );
}
