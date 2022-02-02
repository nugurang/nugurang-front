import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface CssProps {
  css?: string;
  className?: string;
}

interface ComponentProps extends CssProps {
  src: string;
  alt?: string;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledImageWrap = styled.img<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    vertical-align: top;
    transition-duration: 0.2s;
    transition-property: background-color, color;
    ${props.css || ''}
  `}
`;

const Button: NextPage<ComponentProps> = ({
  className,
  css,
  src,
  alt,
}) => {
  return (
    <StyledImageWrap
      className={className}
      css={css}
      src={src}
      alt={alt || ''}
    />
  );
}

export default Button;
