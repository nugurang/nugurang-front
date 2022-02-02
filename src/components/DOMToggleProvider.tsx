import { useEffect, useState } from 'react';

import type { NextPage } from 'next';
import React from 'react';
import type { ThemeObject } from '@/src/styles/theme';
import styled from '@emotion/styled';

interface CssProps {
  active: boolean;
  css?: string;
}

interface ComponentProps extends CssProps {
  className?: string;
  children?: React.ReactNode;
  setCSSActive: (cssActive: boolean) => void;
  transitionTimeout: number;
}

interface StyledWrapProps extends CssProps {
  cssActive: boolean;
  domActive: boolean;
  theme: ThemeObject;
}

const StyledWrap = styled.div<StyledWrapProps>`
  ${(props: StyledWrapProps) => `
    display: ${props.domActive ? 'block' : 'none'};
  `}
`;

const DOMToggleProvider: NextPage<ComponentProps> = ({
  active,
  children,
  className,
  setCSSActive,
  transitionTimeout
}) => {
  const [domActive, setDOMActive] = useState(active);

  useEffect(
    () => {
      if (active) {
        setDOMActive(active);
        const transitionTimer = setTimeout(() => setCSSActive(active), 100);
        return () => {
          clearTimeout(transitionTimer);
        };
      } else {
        setCSSActive(active);
        const transitionTimer = setTimeout(() => setDOMActive(active), transitionTimeout * 1000);
        return () => {
          clearTimeout(transitionTimer);
        };
      };
    }, [active]
  );

  return (
    <StyledWrap
      active={active}
      domActive={domActive}
      className={className}
    >
      { children }
    </StyledWrap>
  );
}

export default DOMToggleProvider;
