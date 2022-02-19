import type { CommonComponentProps } from '@/components/common';
import Div from '@/components/quarks/div/Div';
import React from 'react';
import type { UseComponentSizeObject } from '@/hooks/useComponentSize';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  size: UseComponentSizeObject;
  firstChildren?: React.ReactNode;
  secondChildren?: React.ReactNode;
}

const StyledGridDiv = styled(Div)<ViewProps>`
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
    overflow: hidden;
  `}
`;

const PageOverviewView: React.FC<ViewProps> = React.forwardRef((props, ref) => {
  return (
    <StyledGridDiv
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

export default PageOverviewView;
