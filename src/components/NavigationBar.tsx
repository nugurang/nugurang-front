import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from 'styled-components';

export const height = '64px';

interface Props {
  children: React.ReactNode;
}

// NavigationBar가 document 내부에서 자리할 공간을 확보하기 위한 더미 요소
const StyledDivDummy = styled.div`
  ${(props: any) => `
    height: ${height};
  `}
`;

const StyledNavigationBarWrap = styled.nav`
  ${(props: any) => `
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

const NavigationBar: NextPage<Props> = ({ children }) => {
  return (
    <>
      <StyledDivDummy />
      <StyledNavigationBarWrap>
        <WidthLimiter>
          { children }
        </WidthLimiter>
      </StyledNavigationBarWrap>
    </>
  );
}

export default NavigationBar;
