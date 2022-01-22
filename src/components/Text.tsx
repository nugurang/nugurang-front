import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  css?: string;
  paletteType?: string;
  variant?: string;
}

interface StyledTextWrapProps {
  paletteType?: string;
}

const StyledCommonWrap = (props: any) => `
  color: ${props.theme.palette[props.paletteType].main};
  ${props.css}
`;

const StyledH1Wrap = styled.h1<StyledTextWrapProps>`${StyledCommonWrap}`;
const StyledH2Wrap = styled.h2<StyledTextWrapProps>`${StyledCommonWrap}`;
const StyledH3Wrap = styled.h3<StyledTextWrapProps>`${StyledCommonWrap}`;
const StyledH4Wrap = styled.h4<StyledTextWrapProps>`${StyledCommonWrap}`;
const StyledH5Wrap = styled.h5<StyledTextWrapProps>`${StyledCommonWrap}`;
const StyledH6Wrap = styled.h6<StyledTextWrapProps>`${StyledCommonWrap}`;
const StyledPWrap = styled.p<StyledTextWrapProps>`${StyledCommonWrap}`;

const Text: NextPage<Props> = ({ children, css, paletteType = 'default', variant = 'none' }) => {
  return (
    <>
      {variant == 'none' && <>{children}</>}
      {variant == 'h1' && (
        <StyledH1Wrap
          css={css}
          paletteType={paletteType}
        >
          {children}
        </StyledH1Wrap>
      )}
      {variant == 'h2' && (
        <StyledH2Wrap
          css={css}
          paletteType={paletteType}
        >
          {children}
        </StyledH2Wrap>
      )}
      {variant == 'h3' && (
        <StyledH3Wrap
          css={css}
          paletteType={paletteType}
        >
          {children}
        </StyledH3Wrap>
      )}
      {variant == 'h4' && (
        <StyledH4Wrap
          css={css}
          paletteType={paletteType}
        >
          {children}
        </StyledH4Wrap>
      )}
      {variant == 'h5' && (
        <StyledH5Wrap
          css={css}
          paletteType={paletteType}
        >
          {children}
        </StyledH5Wrap>
      )}
      {variant == 'h6' && (
        <StyledH6Wrap
          css={css}
          paletteType={paletteType}
        >
          {children}
        </StyledH6Wrap>
      )}
      {variant == 'p' && (
        <StyledPWrap
          css={css}
          paletteType={paletteType}
        >
          {children}
        </StyledPWrap>
      )}
    </>
  );
}

export default Text;
