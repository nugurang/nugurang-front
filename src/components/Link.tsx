import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import NextLink from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import type { UrlObject } from 'url';
import styled from 'styled-components';

interface CssProps {
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
    &:visited {
      color: ${props.theme.palette[props.palette || 'default'].text};
    }
    ${props.css}
  `}
`;

const StyledALikeButtonWrap = styled.a<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: inline-block;
    border: 0px solid #000;
    border-radius: 4px;
    color: ${props.theme.palette[props.palette || 'default'].text};
    background-color: ${props.theme.palette[props.palette || 'default'].main};
    padding: 10px 20px;
    text-decoration: none;
    &:hover {
      background-color: ${props.theme.palette[props.palette || 'default'].dark};
    }
    &:visited {
      color: ${props.theme.palette[props.palette || 'default'].text};
    }
    ${props.css}
  `}
`;

const Link: NextPage<ComponentProps> = ({
  button,
  css,
  children,
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
        css={css}
        palette={palette}
      >
        { children }
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
        css={css}
        palette={palette}
      >
        { children }
      </StyledAWrap>
    </NextLink>
  );
}

export default Link;
