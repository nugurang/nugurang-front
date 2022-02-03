import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import WidthLimiter from '@/src/components/WidthLimiter';
import { fontFamily } from '@/src/styles/preset';
import styled from '@emotion/styled';

interface CssProps {
  theme: ThemeObject;
}

interface StyledWrapProps {
  theme: ThemeObject;
}

// Footer가 document 내부에서 자리할 공간을 확보하기 위한 더미 요소
const StyledDivDummy = styled.div`
  ${(props: any) => `
    height: 64px;
  `}
`;

const StyledFooterWrap = styled.footer<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props.theme.palette.background.low};
    color: ${props.theme.palette.background.low};
    height: 64px;
    transition-duration: 0.2s;
    transition-property: background-color, color;
    ${fontFamily}
  `}
`;

const StyledCopyrightDiv = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    font-size: 10px;
    text-align: center;
    color: ${props.theme.palette.background.subtext};
    margin-top: 26px;
    ${fontFamily}
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
