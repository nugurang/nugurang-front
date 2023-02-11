import { useContext } from 'react';
import styled from '@emotion/styled';
import { PaletteKey, PaletteColorKey, ThemeContext, Theme } from '../theme';
import { TextAlignKey } from './common';

interface ParagraphProps {
  theme?: Theme
  children?: string | null;
  align?: TextAlignKey;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
}
const Paragraph = styled.p<ParagraphProps>`
  ${props => `
    ${(props.align ? `text-align: ${props.align};` : '')}
    color: ${props.theme.palette[props.palette ?? 'default'][props.paletteColor ?? 'text']};
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
    <Paragraph
      theme={theme}
      align={align}
      palette={palette}
      paletteColor={paletteColor}
    >
      {children}
    </Paragraph>
  );
}
