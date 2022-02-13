import { useEffect, useState } from 'react';

import type { CommonComponentProps } from '@/src/components/common';
import DOMToggleProviderView from '@/src/components/atoms/domToggleProvider/DOMToggleProviderView';

interface ComponentProps extends CommonComponentProps {
  setCSSActive: (cssActive: boolean) => void;
  transitionTimeout: number;
}

const DOMToggleProvider: React.FC<ComponentProps> = props => {
  const [domActive, setDOMActive] = useState(props.enable ?? false);

  useEffect(() => {
    if (props.enable) {
      setDOMActive(props.enable ?? false);
      const transitionTimer = setTimeout(() => props.setCSSActive(props.enable ?? false), 100);
      return () => {
        clearTimeout(transitionTimer);
      };
    } else {
      props.setCSSActive(props.enable ?? false);
      const transitionTimer = setTimeout(() => setDOMActive(props.enable ?? false), props.transitionTimeout * 1000);
      return () => {
        clearTimeout(transitionTimer);
      };
    };
  }, [props, props.enable, props.transitionTimeout]);

  const viewProps = {
    ...props,
    domActive
  };

  return (
    <DOMToggleProviderView {...viewProps} />
  );
}

export default DOMToggleProvider;
