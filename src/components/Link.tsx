import NextLink from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

interface Props {
  css?: string;
  children: React.ReactNode;
  href: string;
  paletteType?: string;
}

interface StyledAWrapProps {
  paletteType: string;
  css?: string;
}

const StyledAWrap = styled.a<StyledAWrapProps>`
  ${(props: any) => `
    display: inline-block;
    text-decoration: none;
    ${props.css}
  `}
`;

const Link: NextPage<Props> = ({ css = '', children, href, paletteType = 'default' }) => {
  return (
    <NextLink href={href} passHref>
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
