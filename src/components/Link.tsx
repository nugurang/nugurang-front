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
  href: string | UrlObject | undefined;
  locale?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
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
    border-radius: ${props.theme.borderRadius.round};
    &:visited {
      color: ${props.theme.palette[props.palette || 'transparent'].text};
    }
    &:active {
      transform: scale(0.9);
    }
    -webkit-transition: background-color 0.2s, transform 0.2s;
    transition: background-color 0.2s, transform 0.2s;
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
    &:hover {
      background-color: ${props.theme.palette[props.palette || 'transparent'].dark};
    }
    &:visited {
      color: ${props.theme.palette[props.palette || 'transparent'].text};
    }
    &:active {
      transform: scale(0.9);
    }
    -webkit-transition: background-color 0.2s, transform 0.2s;
    transition: background-color 0.2s, transform 0.2s;
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
    transition: background-color 0.2s;
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
  onMouseEnter,
  onMouseLeave,
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
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
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
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        { children }
        <StyledHoverEffectDiv />
      </StyledAWrap>
    </NextLink>
  );
}

export default Link;
