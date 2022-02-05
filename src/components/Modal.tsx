import type { CommonProps, PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Backdrop from '@/src/components/Backdrop';
import Card from '@/src/components/Card';
import DOMToggleProvider from '@/src/components/DOMToggleProvider';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';

interface ComponentProps extends CommonProps {
  children?: React.ReactNode;
  className?: string;
  open: boolean;
  transitionTimeout: number;
  onClickBackdrop?: (() => void) | undefined;
}

interface StyledProps extends CommonProps {
  open: boolean;
  transitionTimeout: number;
}

const StyledModalCard = styled(Card)<StyledProps>`
  ${(props: any) => `
    position: fixed;
    top: ${props.open ? '50%' : '100%'};
    bottom: initial;
    left: 0;
    width: 100%;
    transform: translateY(-50%);

    border-radius: 0;
    background-color: ${props.theme.palette[props.palette || 'default'].low};

    opacity: ${props.open ? '1' : '0'};
    z-index: ${props.theme.zIndex.modal};
    
    ${props.css || ''}
  `}
`;

const Modal: NextPage<ComponentProps> = props => {
  const [cssActive, setCSSActive] = useState(false);
  const transitionTimeout = 0.5;
  return (
    <DOMToggleProvider
      active={props.open}
      setCSSActive={setCSSActive}
      transitionTimeout={transitionTimeout}
    >
      <Backdrop
        open={cssActive}
        onClick={props.onClickBackdrop}
      />
      <StyledModalCard
        className={props.className}
        css={props.css}
        open={cssActive}
        palette={props.palette ? props.palette : 'background'}
        transitionTimeout={transitionTimeout}
      >
        {props.children}
      </StyledModalCard>
    </DOMToggleProvider>
  );
}

export default Modal;
