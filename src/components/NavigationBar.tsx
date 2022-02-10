import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import Div from '@/src/components/base/Div';
import Nav from '@/src/components/base/Nav';
import type { NextPage } from 'next';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from '@emotion/styled';

export const height = 64;

interface ComponentProps extends CommonProps {}

interface StyledComponentProps extends CommonStyledProps {}

const StyledWrapDiv = styled(Div)`
  ${(props: any) => `
  `}
`;

// NavigationBar가 document 내부에서 자리할 공간을 확보하기 위한 더미 요소
const StyledDummyDiv = styled(Div)`
  ${(props: any) => `
    height: ${height}px;
  `}
`;

const StyledNavigationBarWrap = styled(Nav)`
  ${(props: any) => `
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props.theme.palette.background.main};
    color: ${props.theme.palette.primary.main};
    height: ${height}px;
    text-align: center;
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const StyledWidthLimiter = styled(WidthLimiter)`
  ${(props: any) => `
    & > * {
      margin-left: 4px;
    }
    & > *:first-of-type {
      margin-left: 0;
    }
  `}
`;

const NavigationBar: React.FC<ComponentProps> = props => {
  return (
    <StyledWrapDiv
      className={props.className}
      css={props.css}
    >
      <StyledDummyDiv />
      <StyledNavigationBarWrap>
        <StyledWidthLimiter>
          { props.children }
        </StyledWidthLimiter>
      </StyledNavigationBarWrap>
    </StyledWrapDiv>
  );
}

export default NavigationBar;
