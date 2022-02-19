import type { CommonComponentProps } from '@/components/common';
import ImageView from '@/components/atoms/image/ImageView';
import React from 'react';

interface ComponentProps extends CommonComponentProps {
  children?: React.ReactNode;
  src?: string;
  alt?: string;
}

const Image: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <ImageView {...viewProps} />
  );
  
};

export default Image;
