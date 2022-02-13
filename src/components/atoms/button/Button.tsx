import ButtonView from '@/src/components/atoms/button/ButtonView';
import type { CommonComponentProps } from '@/src/components/common';
import React from 'react';

interface ComponentProps extends CommonComponentProps {
  children?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

const Button: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <ButtonView
      {...viewProps}
    />
  );
};

export default Button;
