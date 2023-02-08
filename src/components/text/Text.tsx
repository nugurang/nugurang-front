import { useContext } from 'react';
import styled from '@emotion/styled';
import { PaletteKey, PaletteColorKey, Theme, ThemeContext } from '../theme';

type TextAlignProps = 'left' | 'right' | 'center';
type TextVariantProps = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

interface TextProps {
  theme: Theme;
  children: JSX.Element | string | null;
  align?: TextAlignProps;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
  variant?: TextVariantProps;
  css?: string;
}
const TextBaseCss = (props: TextProps) => `
  ${(props.align ? `text-align: ${props.align};` : '')}
  color: ${props.theme.palette[props.palette ?? 'default'][props.paletteColor ?? 'text']};
`;
const TextExternalCss = (props: TextProps) => `
  ${(props.css ? `${props.css}` : '')}
`;
const Header1 = styled.h1<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 28px;
  ${props => TextExternalCss(props)}
`;
const Header2 = styled.h2<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 26px;
  ${props => TextExternalCss(props)}
`;
const Header3 = styled.h3<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 24px;
  ${props => TextExternalCss(props)}
`;
const Header4 = styled.h4<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 22px;
  ${props => TextExternalCss(props)}
`;
const Header5 = styled.h5<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 20px;
  ${props => TextExternalCss(props)}
`;
const Header6 = styled.h6<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 18px;
  ${props => TextExternalCss(props)}
`;
const Paragraph = styled.p<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 16px;
  ${props => TextExternalCss(props)}
`;
const Span = styled.span<TextProps>`
  ${props => TextBaseCss(props)}
  ${props => TextExternalCss(props)}
`;

interface Props {
  children: JSX.Element | string | null;
  align?: TextAlignProps;
  palette?: PaletteKey;
  paletteColor?: PaletteColorKey;
  variant?: TextVariantProps;
  css?: string;
}
export default (props: Props) => {
  const {
    children,
    align,
    palette,
    paletteColor,
    variant,
    css,
  } = props;
  const { theme } = useContext(ThemeContext);

  const defaultAlign = 'left';
  const defaultPalette = 'primary';
  const defaultPaletteColor = 'text';
  switch(variant) {
    case 'h1':
      return (
        <Header1
          theme={theme}
          align={align ?? defaultAlign}
          palette={palette ?? defaultPalette}
          paletteColor={paletteColor ?? defaultPaletteColor}
          css={css}
        >
          {children}
        </Header1>
      );
    case 'h2':
      return (
        <Header2
          theme={theme}
          align={align ?? defaultAlign}
          palette={palette ?? defaultPalette}
          paletteColor={paletteColor ?? defaultPaletteColor}
          css={css}
        >
          {children}
        </Header2>
      );
    case 'h3':
      return (
        <Header3
          theme={theme}
          align={align ?? defaultAlign}
          palette={palette ?? defaultPalette}
          paletteColor={paletteColor ?? defaultPaletteColor}
          css={css}
        >
          {children}
        </Header3>
      );
    case 'h4':
      return (
        <Header4
          theme={theme}
          align={align ?? defaultAlign}
          palette={palette ?? defaultPalette}
          paletteColor={paletteColor ?? defaultPaletteColor}
          css={css}
        >
          {children}
        </Header4>
      );
    case 'h5':
      return (
        <Header5
          theme={theme}
          align={align ?? defaultAlign}
          palette={palette ?? defaultPalette}
          paletteColor={paletteColor ?? defaultPaletteColor}
          css={css}
        >
          {children}
        </Header5>
      );
    case 'h6':
      return (
        <Header6
          theme={theme}
          align={align ?? defaultAlign}
          palette={palette ?? defaultPalette}
          paletteColor={paletteColor ?? defaultPaletteColor}
          css={css}
        >
          {children}
        </Header6>
      );
    case 'p':
      return (
        <Paragraph
          theme={theme}
          align={align ?? defaultAlign}
          palette={palette ?? defaultPalette}
          paletteColor={paletteColor ?? defaultPaletteColor}
          css={css}
        >
          {children}
        </Paragraph>
      );
    default:
      return (
        <Span
          theme={theme}
          align={align ?? defaultAlign}
          palette={palette ?? defaultPalette}
          paletteColor={paletteColor ?? defaultPaletteColor}
          css={css}
        >
          {children}
        </Span>
      );
  }
}
