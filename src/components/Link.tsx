import NextLink from 'next/link';
import { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

interface Props {
  button?: boolean;
  css?: string;
  children: React.ReactNode;
  href: string | object;
  locale?: string;
  paletteType?: string;
  passHref?: boolean;
  replace?: boolean;
}

interface StyledAWrapProps {
  paletteType: string;
  css?: string;
}

const StyledAWrap = styled.a<StyledAWrapProps>`
  ${(props: any) => `
    display: inline-block;
    &:visited {
      color: ${props.theme.palette[props.paletteType].text};
    }
    ${props.css}
  `}
`;

const StyledALikeButtonWrap = styled.a<StyledAWrapProps>`
  ${(props: any) => `
    border: 0px solid #000;
    border-radius: 4px;
    color: ${props.theme.palette[props.paletteType].text};
    background-color: ${props.theme.palette[props.paletteType].main};
    padding: 10px 20px;
    display: inline-block;
    text-decoration: none;
    &:hover {
      background-color: ${props.theme.palette[props.paletteType].dark};
    }
    &:visited {
      color: ${props.theme.palette[props.paletteType].text};
    }
    ${props.css}
  `}
`;

const Link: NextPage<Props> = ({
  button = false,
  css = '',
  children,
  href,
  locale = undefined,
  paletteType = 'default',
  passHref = false,
  replace = false
}) => {
  if (button) return (
    <NextLink href={href} locale={locale} passHref={passHref} replace={replace}>
      <StyledALikeButtonWrap
        css={css}
        paletteType={paletteType}
      >
        { children }
      </StyledALikeButtonWrap>
    </NextLink>
  );
  else return (
    <NextLink href={href} passHref replace={replace}>
      <StyledAWrap
        css={css}
        paletteType={paletteType}
      >
        { children }
      </StyledAWrap>
    </NextLink>
  );
}

export default Link;
