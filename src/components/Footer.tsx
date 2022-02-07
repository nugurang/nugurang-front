import type { CommonStyledProps } from '@/src/components/base/common';
import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from '@emotion/styled';

interface StyledComponentProps extends CommonStyledProps {}

// Footer가 document 내부에서 자리할 공간을 확보하기 위한 더미 요소
const StyledDivDummy = styled(Div)`
  ${(props: any) => `
    height: 64px;
  `}
`;

const StyledFooterWrap = styled.footer<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props.theme.palette.background.low};
    color: ${props.theme.palette.background.low};
    height: 64px;
    transition-duration: 0.2s;
    transition-property: background-color, color;
  `}
`;

const StyledCopyrightDiv = styled(Div)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    font-size: 10px;
    text-align: center;
    color: ${props.theme.palette.background.subtext};
    padding-top: 26px;
  `}
`;

const Footer: NextPage = () => {
  return (
    <>
      <StyledDivDummy />
      <StyledFooterWrap>
        <WidthLimiter>
          <StyledCopyrightDiv>
            &copy; nugurang. All rights reserved.
          </StyledCopyrightDiv>
        </WidthLimiter>
      </StyledFooterWrap>
    </>
  );
}

export default Footer;
