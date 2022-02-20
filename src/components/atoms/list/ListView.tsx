import type { CommonComponentProps } from '@/components/common';
import { CommonStyledAttributes } from '@/components/common';
import styled from '@emotion/styled';
import React from 'react';

interface ViewProps extends CommonComponentProps {
  ordered?: boolean;
}

const StyledOl = styled.ol<ViewProps>`
  ${(props: any) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const StyledUl = styled.ul<ViewProps>`
  ${(props: any) => `
    ${CommonStyledAttributes(props)}
    ${props.css}
  `}
`;

const StyledLi = styled.li<ViewProps>`
  ${(props: any) => `
    ${CommonStyledAttributes(props)}
    width: 100%;
    &:not(:first-of-type)::before {
      content: '';
      display: block;
      border-top: 1px solid ${props.theme.palette.default.high};
      margin: 8px 0;
    }
    ${props.css}
  `}
`;

const ListView: React.FC<ViewProps> = props => {
  if (props.ordered) return (
    <StyledOl {...props} >
      {React.Children.map(props.children, child => 
        <StyledLi {...props}>
          {child}
        </StyledLi>
      )}
    </StyledOl>
  );
  else return (
    <StyledUl {...props} >
      {React.Children.map(props.children, child => 
        <StyledLi {...props}>
          {child}
        </StyledLi>
      )}
    </StyledUl>
  );
}

export default ListView;
