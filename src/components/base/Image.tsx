import type { CommonProps, CommonStyledProps } from '@/src/components/base/common';

import { CommonStyledAttributes } from '@/src/components/base/common';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
}

interface StyledComponentProps extends CommonStyledProps {}

const StyledImage = styled.img<StyledComponentProps>`
  ${(props: StyledComponentProps) => `
    ${CommonStyledAttributes(props)}

    object-fit: cover;
    height: 100%;
    width: 100%;
    vertical-align: top;
    
    ${props.css || ''}
  `}
`;

const Img: NextPage<ComponentProps> = React.forwardRef((props, ref) => {
  return (
    <StyledImage
      className={props.className}
      css={props.css}
      ref={ref}

      enable={props.enable}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}

      src={props.src}
      alt={props.alt ? props.alt : ''}
    />
  );
});

export default Img;
