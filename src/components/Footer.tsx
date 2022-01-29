import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import WidthLimiter from '@/src/components/WidthLimiter';
import styled from 'styled-components';

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
  `}
`;

const StyledCopyrightWrap = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    font-size: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: ${props.theme.palette.background.subtext};
  `}
`;

const Footer: NextPage = () => {
  return (
    <>
      <StyledDivDummy />
      <StyledFooterWrap>
        <WidthLimiter>
          <StyledCopyrightWrap>
            &copy; nugurang. All rights reserved.
          </StyledCopyrightWrap>
        </WidthLimiter>
      </StyledFooterWrap>
    </>
  );
}

export default Footer;
