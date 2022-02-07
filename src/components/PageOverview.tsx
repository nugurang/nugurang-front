import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRef } from 'react';
import useResize from '@/src/hooks/useResize';

type Size = {
  width: number;
}

interface ComponentProps extends CommonProps {
  children: undefined;
  firstChildren: React.ReactNode;
  secondChildren?: React.ReactNode;
}

interface StyledComponentProps extends CommonStyledProps {
  size: Size;
}

const StyledGridDiv = styled(Div)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
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

const StyledGridItemDiv = styled(Div)<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    margin: auto 0;
    max-height: 50vh;
  `}
`;

const PageOverview: NextPage<ComponentProps> = props => {
  const componentRef = useRef();
  const size = useResize(componentRef);
  return (
    <StyledGridDiv
      ref={componentRef}
      size={size}
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
}

export default PageOverview;
