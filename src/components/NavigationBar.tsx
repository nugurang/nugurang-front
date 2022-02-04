import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from '@emotion/styled';

export const height = '64px';

interface CssProps {
  css?: string;
  palette?: PaletteKey;
}

interface ComponentProps extends CssProps {
  children: React.ReactNode;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

// NavigationBar가 document 내부에서 자리할 공간을 확보하기 위한 더미 요소
const StyledDivDummy = styled.div`
  ${(props: any) => `
    height: ${height};
  `}
`;

const StyledNavigationBarWrap = styled.nav<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.primary.main};
    height: ${height};
    text-align: center;
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const StyledWidthLimiter = styled.div`
  ${(props: any) => `
    & > * {
      margin-left: 4px;
    }
    & > *:first-of-type {
      margin-left: 0;
    }
  `}
`;

const NavigationBar: NextPage<ComponentProps> = ({
  css,
  children
 }) => {
  return (
    <>
      <StyledDivDummy />
      <StyledNavigationBarWrap>
        <StyledWidthLimiter>
          { children }
        </StyledWidthLimiter>
      </StyledNavigationBarWrap>
    </>
  );
}

export default NavigationBar;
