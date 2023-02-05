import styled from '@emotion/styled';

type TextAlignProps = 'left' | 'right' | 'center';
type TextVariantProps = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

interface TextProps {
  children: JSX.Element | string | null;
  align?: TextAlignProps;
  variant?: TextVariantProps;
  css?: string;
}
const TextBaseCss = (props: TextProps) => `
  ${(props.align ? `text-align: ${props.align};` : '')}
  ${(props.css ? `${props.css}` : '')}
`;
const Header1 = styled.h1<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 28px;
`;
const Header2 = styled.h2<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 26px;
`;
const Header3 = styled.h3<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 24px;
`;
const Header4 = styled.h4<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 22px;
`;
const Header5 = styled.h5<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 20px;
`;
const Header6 = styled.h6<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 18px;
`;
const Paragraph = styled.p<TextProps>`
  ${props => TextBaseCss(props)}
  font-size: 16px;
`;
const Span = styled.span<TextProps>`
  ${props => TextBaseCss(props)}
`;

interface Props {
  children: JSX.Element | string | null;
  align?: TextAlignProps;
  variant?: TextVariantProps;
  css?: string;
}
export default (props: Props) => {
  const {
    children,
    align,
    variant,
    css,
  } = props;

  const defaultAlign = 'left';
  switch(variant) {
    case 'h1':
      return (
        <Header1 align={align ?? defaultAlign} css={css}>
          {children}
        </Header1>
      );
    case 'h2':
      return (
        <Header2 align={align ?? defaultAlign} css={css}>
          {children}
        </Header2>
      );
    case 'h3':
      return (
        <Header3 align={align ?? defaultAlign} css={css}>
          {children}
        </Header3>
      );
    case 'h4':
      return (
        <Header4 align={align ?? defaultAlign} css={css}>
          {children}
        </Header4>
      );
    case 'h5':
      return (
        <Header5 align={align ?? defaultAlign} css={css}>
          {children}
        </Header5>
      );
    case 'h6':
      return (
        <Header6 align={align ?? defaultAlign} css={css}>
          {children}
        </Header6>
      );
    case 'p':
      return (
        <Paragraph align={align ?? defaultAlign} css={css}>
          {children}
        </Paragraph>
      );
    default:
      return (
        <Span align={align ?? defaultAlign} css={css}>
          {children}
        </Span>
      );
  }
}
