import type { CommonComponentProps } from '@/components/common';
import React from 'react';
import SpanView from '@/components/quarks/span/SpanView';

interface ComponentProps extends CommonComponentProps {}

const Span: React.FC<ComponentProps> = props => {

  const viewProps = {
    ...props
  };

  return (
    <SpanView {...viewProps} />
  );
};

export default Span;
