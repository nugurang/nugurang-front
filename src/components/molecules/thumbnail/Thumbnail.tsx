import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import ThumbnailView from '@/src/components/molecules/thumbnail/ThumbnailView';
import { useState } from 'react';

interface ComponentProps extends CommonComponentProps {
  imageUrl?: string;
  title?: string;
}

const Thumbnail: React.FC<ComponentProps> = props => {
  const [state, setState] = useState({
    isHover: false,
  });

  const viewProps = {
    ...props,
    state,
    setState
  };

  return (
    <ThumbnailView
      {...viewProps}
      onMouseEnter={() => setState((state: any) => ({ ...state, isHover: true }))}
      onMouseLeave={() => setState((state: any) => ({ ...state, isHover: false }))}
    />
  );
}

export default Thumbnail;
