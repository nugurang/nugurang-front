import type { CommonProps, PaletteKeys, ThemeObject } from '@/src/components/base/common';
import { useEffect, useState } from 'react';

import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import styled from '@emotion/styled';

interface ComponentProps extends CommonProps {
  active: boolean;
  setCSSActive: (cssActive: boolean) => void;
  transitionTimeout: number;
}

interface StyledWrapProps extends CommonProps {
  active: boolean;
  cssActive: boolean;
  domActive: boolean;
}

const StyledWrap = styled(Div)<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: ${props.domActive ? 'block' : 'none'};
  `}
`;

const DOMToggleProvider: NextPage<ComponentProps> = props => {
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
    }, [props.active]
  );

  return (
    <StyledWrap
      active={props.active}
      domActive={domActive}
      className={props.className}
    >
      { props.children }
    </StyledWrap>
  );
}

export default DOMToggleProvider;
