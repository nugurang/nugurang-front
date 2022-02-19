import type { CommonComponentProps, CommonStyledProps } from '@/components/common';

import { CommonStyledAttributes } from '@/components/common';
import React from 'react';
import styled from '@emotion/styled';

interface ComponentProps extends CommonComponentProps {}

interface StyledComponentProps extends CommonStyledProps {}

const StyledLi = styled.li<StyledComponentProps>`
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

const ListItem: React.FC<ComponentProps> = props => {
  return (
    <StyledLi {...props} >
      { props.children }
    </StyledLi>
  );
};

export default ListItem;
