import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import NextLink from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import type { UrlObject } from 'url';
import { fontFamily } from '@/src/styles/preset';
import styled from '@emotion/styled';

interface CssProps {
  className?: string;
  css?: string;
  palette?: PaletteKey;
}

interface ComponentProps extends CssProps {
  button?: boolean;
  children?: React.ReactNode;
  href: string | UrlObject;
  locale?: string;
  passHref?: boolean;
  replace?: boolean;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledAWrap = styled.a<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: inline-block;
    position: relative;
    overflow: hidden;
    border: 0px solid #000;
    border-radius: ${props.theme.borderRadius.round};
    color: ${props.theme.palette.transparent.text};
    transition-duration: 0.2s;
    transition-property: background-color, color;
    &:visited {
      color: ${props.theme.palette[props.palette || 'transparent'].text};
    }
    ${fontFamily}
    ${props.css}
  `}
`;

const StyledALikeButtonWrap = styled.a<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: inline-block;
    position: relative;
    border: 0px solid #000;
    border-radius: ${props.theme.borderRadius.round};
    color: ${props.theme.palette[props.palette || 'transparent'].text};
    background-color: ${props.theme.palette[props.palette || 'transparent'].main};
    padding: 10px 20px;
    text-decoration: none;
    overflow: hidden;
    transition-duration: 0.2s;
    transition-property: background-color, color;
    &:hover {
      background-color: ${props.theme.palette[props.palette || 'transparent'].dark};
    }
    &:visited {
      color: ${props.theme.palette[props.palette || 'transparent'].text};
    }
    ${fontFamily}
    ${props.css}
  `}
`;

const StyledHoverEffectDiv = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: ${props.palette ? 'none' : 'block'};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #0000;
    transition-duration: 0.2s;
    transition-property: background-color, color;
    &:hover {
      background-color: #0002;
    }
  `}
`;

const Link: NextPage<ComponentProps> = ({
  button,
  css,
  children,
  className,
  href,
  locale,
  palette,
  replace
}) => {
  if (button) return (
    <NextLink
      href={href}
      locale={locale}
      passHref
      replace={replace}
    >
      <StyledALikeButtonWrap
        className={className}
        css={css}
        palette={palette}
      >
        { children }
        <StyledHoverEffectDiv />
      </StyledALikeButtonWrap>
    </NextLink>
  );
  else return (
    <NextLink
      href={href}
      locale={locale}
      passHref
      replace={replace}
    >
      <StyledAWrap
        className={className}
        css={css}
        palette={palette}
      >
        { children }
        <StyledHoverEffectDiv />
      </StyledAWrap>
    </NextLink>
  );
}

export default Link;
