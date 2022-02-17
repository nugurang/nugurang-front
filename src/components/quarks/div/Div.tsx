import type { CommonComponentProps } from '@/src/components/common';
import DivView from '@/src/components/quarks/div/DivView';
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
