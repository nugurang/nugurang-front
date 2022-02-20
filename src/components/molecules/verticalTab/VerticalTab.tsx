import type { CommonComponentProps } from '@/components/common';

import VerticalTabView from '@/components/molecules/verticalTab/VerticalTabView';
import { useState } from 'react';

interface ComponentProps extends CommonComponentProps {
  ordered?: boolean;
  items: VerticalTabItemObject[];
  initialIndex?: number;
  initialDepth?: number;
}

const VerticalTab: React.FC<ComponentProps> = props => {
  const [selectedTab, setSelectedTab] = useState({
    index: props.initialIndex ?? 0,
    depth: props.initialDepth ?? 0
  });

  let viewProps = {
    ...props,
    selectedTab,
    setSelectedTab
  };

  return (
    <VerticalTabView {...viewProps} />
  );
}

export default VerticalTab;
