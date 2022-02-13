import type { CommonComponentProps } from '@/src/components/common';
import { CommonStyledAttributes } from '@/src/components/common';
import React from 'react';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
}

const StyledImage = styled.img<ViewProps>`
  ${(props: any) => `
    ${CommonStyledAttributes(props)}

    object-fit: cover;
    height: 100%;
    width: 100%;
    vertical-align: top;
    
    ${props.css || ''}
  `}
`;

const ImageView: React.FC<ViewProps> = props => {

  const imageProps = {
    ...props,
    alt: props.alt ?? ''
  }

  return (
    <StyledImage {...imageProps} />
  );
};

export default ImageView;
