import type { CommonComponentProps } from '@/components/common';
import Div from '@/components/quarks/div/Div';
import WidthLimiter from '@/components/atoms/widthLimiter/WidthLimiter';
import styled from '@emotion/styled';

export const height = 64;

interface ComponentProps extends CommonComponentProps {}

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

const StyledNavigationBarWrap = styled.nav`
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

const NavigationBarView: React.FC<ComponentProps> = props => {
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

export default NavigationBarView;
