import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from 'styled-components';

export const height = '64px';

// Footer가 document 내부에서 자리할 공간을 확보하기 위한 더미 요소
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
    background-color: ${props.theme.palette.secondary.main};
    color: ${props.theme.palette.text.sub};
    height: ${height};
  `}
`;

const NavigationBar: NextPage = () => {
  return (
    <>
      <StyledDivDummy />
      <StyledNavigationBarWrap>
        <WidthLimiter>
          nav
        </WidthLimiter>
      </StyledNavigationBarWrap>
    </>
  );
}

export default NavigationBar;
