import type { CommonComponentProps } from '@/src/components/common';
import PageOverviewView from '@/src/components/molecules/pageOverview/PageOverviewView';
import React from 'react';
import type { UseComponentSizeObject } from '@/src/hooks/useComponentSize';
import useComponentSize from '@/src/hooks/useComponentSize';
import { useRef } from 'react';

interface ComponentProps extends CommonComponentProps {
  firstChildren?: React.ReactNode;
  secondChildren?: React.ReactNode;
}

const PageOverview: React.FC<ComponentProps> = props => {
  const componentRef = useRef();
  const size: UseComponentSizeObject = useComponentSize(componentRef);

  const viewProps = {
    ...props,
    size
  };

  return (
    <div ref={componentRef as any}>
      <PageOverviewView {...viewProps} />
    </div>
  );

};

export default PageOverview;
