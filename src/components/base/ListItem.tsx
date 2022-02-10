import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import { CommonStyledAttributes } from '@/src/components/base/common';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {}

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
    <StyledLi
      className={props.className}
      css={props.css}

      ellipsis={props.ellipsis}
      enable={props.enable}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      palette={props.palette}
      variant={props.variant}
    >
      { props.children }
    </StyledLi>
  );
};

export default ListItem;
