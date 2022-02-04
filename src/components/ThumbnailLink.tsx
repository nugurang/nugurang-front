import type { PaletteKey, ThemeObject } from '@/src/styles/theme';
import { ellipsis, fontFamily } from '@/src/styles/preset';

import Image from '@/src/components/Image';
import Link from '@/src/components/Link';
import type { NextPage } from 'next';
import type { UrlObject } from 'url';
import { hexToRGB } from '@/src/utils/color';
import styled from '@emotion/styled';
import { useState } from 'react';

interface CssProps {
  className?: string;
  css?: string;
  imageUrl?: string;
  palette?: PaletteKey;
  title?: string;
  href?: string | UrlObject | undefined;
}

interface ComponentProps extends CssProps {}

interface StyledProps extends CssProps {
  isHover?: boolean;
  theme: ThemeObject;
}
/*
const StyledWrap = styled.div<StyledWrapProps>`
  ${(props: any) => `
    position: relative;
    background-color: ${props.theme.palette[props.palette || 'default'].main};
    color: ${props.theme.palette[props.palette || 'default'].text};
    ${fontFamily}
    ${props.css || ''}
  `}
`;
*/

const StyledLink = styled(Link)<StyledProps>`
  ${(props: StyledProps) => `
    height: 128px;
    ${props.theme.screenSizeMediaQuery.gteMobile} {
      height: 192px;
    }
    transition: all 0.2s ease-out;
    &:active {
      transform: scale(0.95);
    }
  `}
`;

const StyledImage = styled(Image)<StyledProps>`
  ${(props: StyledProps) => `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `}
`;

const StyledNameDiv = styled.div<StyledProps>`
  ${(props: StyledProps) => `
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    font-size: 20px;
    color: #fff;
    background-color: ${hexToRGB(props.theme.palette.primary.light, 0.9)};
    @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
    };
    ${ellipsis}
    ${fontFamily}
  `}
`;

const ThumbnailLink: NextPage<ComponentProps> = ({
  className,
  css,
  href,
  imageUrl,
  palette,
  title
}) => {
  const [state, setState] = useState({
    isHover: false,
  });
  return (
    <StyledLink
      className={className}
      css={css}
      href={href}
      isHover={state.isHover}
      onMouseEnter={() => setState((state: any) => ({ ...state, isHover: true }))}
      onMouseLeave={() => setState((state: any) => ({ ...state, isHover: false }))}
    >
      <StyledImage src={imageUrl}/>
      <StyledNameDiv
        palette={palette}
      >
        {title}
      </StyledNameDiv>
    </StyledLink>
  );
}

export default ThumbnailLink;
