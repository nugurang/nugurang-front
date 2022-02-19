import type { CommonComponentProps } from '@/components/common';
import PageOverviewView from '@/components/molecules/pageOverview/PageOverviewView';
import React from 'react';
import type { UseComponentSizeObject } from '@/hooks/useComponentSize';
import useComponentSize from '@/hooks/useComponentSize';
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
