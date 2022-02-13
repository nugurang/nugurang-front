import { useEffect, useState } from 'react';

import type { CommonComponentProps } from '@/src/components/common';
import DOMToggleProviderView from '@/src/components/atoms/domToggleProvider/DOMToggleProviderView';

interface ComponentProps extends CommonComponentProps {
  active: boolean;
  setCSSActive: (cssActive: boolean) => void;
  transitionTimeout: number;
  domActive: boolean;
}

const DOMToggleProvider: React.FC<ComponentProps> = props => {
  const [domActive, setDOMActive] = useState(props.active);

  useEffect(
    () => {
      if (props.active) {
        setDOMActive(props.active);
        const transitionTimer = setTimeout(() => props.setCSSActive(props.active), 100);
        return () => {
          clearTimeout(transitionTimer);
        };
      } else {
        props.setCSSActive(props.active);
        const transitionTimer = setTimeout(() => setDOMActive(props.active), props.transitionTimeout * 1000);
        return () => {
          clearTimeout(transitionTimer);
        };
      };
    }, [props, props.active]
  );

  const viewProps = {
    ...props,
    domActive
  };

  return (
    <DOMToggleProviderView {...viewProps} />
  );
}

export default DOMToggleProvider;
