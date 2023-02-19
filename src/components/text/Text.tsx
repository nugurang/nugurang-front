import { useContext } from 'react';
import styled from '@emotion/styled';
import { PaletteKey, PaletteColorKey, ThemeContext, Theme } from '../theme';
import { TextAlignKey, TextWeightKey } from './common';

interface TextProps {
  theme?: Theme
  children?: string | null;
  align?: TextAlignKey;
  ellipsis?: number;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
  weight?: TextWeightKey;
  css?: string;
}
const Text = styled.span<TextProps>`
  ${props => `
    ${props.align ? `text-align: ${props.align};` : ''}
    color: ${props.theme.palette[props.palette ?? 'default'][props.paletteColor ?? 'text']};
    ${props.weight ? `font-weight: ${props.weight};` : ''}

    ${props.ellipsis ? `
      overflow: hidden;
      margin-top: 5px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${Math.max(props.ellipsis, 1)};
      -webkit-box-orient: vertical;
      line-height: 1.2em;
      height: calc(${Math.max(props.ellipsis, 1)} * 1.2em);
    ` : ''}

    ${props.css ?? ''}
  `}
`;

interface Props {
  children?: string | null;
  align?: TextAlignKey;
  ellipsis?: number;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
  weight?: TextWeightKey;
  css?: string;
}
export default (props: Props) => {
  const {
    children,
    align,
    ellipsis,
    palette,
    paletteColor,
    weight,
    css,
  } = props;
  const { theme } = useContext(ThemeContext);
  
  return (
    <Text
      theme={theme}
      align={align}
      ellipsis={ellipsis}
      palette={palette}
      paletteColor={paletteColor}
      weight={weight}
      css={css}
    >
      {children}
    </Text>
  );
}
