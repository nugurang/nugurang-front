import type { CommonComponentProps } from '@/components/common';
import DivView from '@/components/quarks/div/DivView';
import React from 'react';

interface ComponentProps extends CommonComponentProps {}

const Div: React.FC<ComponentProps> = React.forwardRef((props, ref) => {

  const viewProps = {
    ...props
  };
  
  return (
    <DivView {...viewProps} />
  );
});

export default Div;
