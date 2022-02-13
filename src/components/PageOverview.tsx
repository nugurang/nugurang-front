import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import Div from '@/src/components/quarks/div/Div';
import React from 'react';
import styled from '@emotion/styled';
import { useRef } from 'react';
import useResize from '@/src/hooks/useResize';

type Size = {
  width?: number;
}

interface ComponentProps extends CommonComponentProps {
  firstChildren?: React.ReactNode;
  secondChildren?: React.ReactNode;
}

interface PageOverviewViewProps extends CommonStyledProps {
  ref: HTMLDivElement;
  size: Size;
  firstChildren?: React.ReactNode;
  secondChildren?: React.ReactNode;
}

const StyledGridDiv = styled(Div)<PageOverviewViewProps>`
  ${(props: any) => `
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
    margin: 0 auto;
    
    ${props.size.width >= props.theme.screenPixelSize.tablet && `
      grid-template-columns: repeat(2, 1fr);
      max-width: ${props.theme.screenPixelSize.tablet}px;
    `}
  `}
`;

const StyledGridItemDiv = styled(Div)`
  ${(props: any) => `
    margin: auto 0;
    max-height: 50vh;
  `}
`;

const PageOverviewView: React.FC<PageOverviewViewProps> = React.forwardRef((props, ref) => {
  return (
    <StyledGridDiv
      ref={ref}
      size={props.size}
    >
      <StyledGridItemDiv
        className={props.className}
        css={props.css}
      >
        {props.firstChildren}
      </StyledGridItemDiv>
      <StyledGridItemDiv
        className={props.className}
        css={props.css}
      >
        {props.secondChildren}
      </StyledGridItemDiv>
    </StyledGridDiv>
  );
});

const PageOverview: React.FC<ComponentProps> = props => {
  const ref = useRef();
  const size: Size = useResize(ref);
  return (
    <PageOverviewView
      ref={ref}
      size={size}
      firstChildren={props.firstChildren}
      secondChildren={props.secondChildren}
    />
  );
};

export default PageOverview;
