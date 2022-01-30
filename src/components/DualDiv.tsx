import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

interface CssProps {
  css?: string;
}

interface ComponentProps extends CssProps {
  firstChild?: React.ReactNode;
  secondChild?: React.ReactNode;
  className?: string;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledWrap = styled.div<StyledWrapProps>`
  ${(props: any) => `
    position: relative;
  `}
`;

const StyledSingleDiv = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: block;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      display: inline-block;
      width: 50%;
      vertical-align: top;
    }
  `}
`;

const StyledFirstChildDiv = styled(StyledSingleDiv)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      width: calc(50% - 10px);
      padding-right: 10px;
    }
  `}
`;

const StyledSecondChildDiv = styled(StyledSingleDiv)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      width: calc(50% - 10px);
      padding-left: 10px;
    }
  `}
`;

const DualDiv: NextPage<ComponentProps> = ({
  className,
  firstChild,
  secondChild
}) => {
  return (
    <StyledWrap
      className={className}
    >
      <StyledFirstChildDiv>
        {firstChild}
      </StyledFirstChildDiv>
      <StyledSecondChildDiv>
        {secondChild}
      </StyledSecondChildDiv>
    </StyledWrap>
  );
}

export default DualDiv;
