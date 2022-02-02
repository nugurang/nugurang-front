import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Backdrop from '@/src/components/Backdrop';
import DOMToggleProvider from '@/src/components/DOMToggleProvider';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';

interface CssProps {
  css?: string;
  open: boolean;
  transitionTimeout: number;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
  className?: string;
  setOpen: (open: boolean) => void;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledModalDiv = styled.div<StyledWrapProps>`
  ${(props: any) => `
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    color: ${props.theme.palette.background.text};
    background-color: ${props.theme.palette.background.main};
    z-index: 510;
    opacity: ${props.open ? '1' : '0'};
    transition: opacity ${props.transitionTimeout}s linear;
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      top: 50%;
      bottom: initial;
      left: 0;
      width: 100%;
      transform: translateY(-50%);
    }
  `}
`;

const Modal: NextPage<ComponentProps> = ({
  children,
  className,
  open,
  setOpen
}) => {
  const [cssActive, setCSSActive] = useState(false);
  const transitionTimeout = 0.2;
  return (
    <DOMToggleProvider
      active={open}
      setCSSActive={setCSSActive}
      transitionTimeout={transitionTimeout}
    >
      <Backdrop
        open={cssActive}
        onClick={() => setOpen(!open)}
        transitionTimeout={transitionTimeout}
      />
      <StyledModalDiv
        className={className}
        open={cssActive}
        transitionTimeout={transitionTimeout}
      >
        {children}
      </StyledModalDiv>
    </DOMToggleProvider>
  );
}

export default Modal;
