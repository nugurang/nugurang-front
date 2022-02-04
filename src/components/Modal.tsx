import type { PaletteKeys, ThemeObject } from '@/src/components/base/common';

import Backdrop from '@/src/components/Backdrop';
import DOMToggleProvider from '@/src/components/DOMToggleProvider';
import Div from '@/src/components/base/Div';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';

interface CssProps {
  css?: string;
  open: boolean;
  palette?: PaletteKeys;
  transitionTimeout: number;
}

interface ComponentProps extends CssProps {
  children?: React.ReactNode;
  className?: string;
  onClickBackdrop?: (() => void) | undefined;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledModalDiv = styled(Div)<StyledWrapProps>`
  ${(props: any) => `
    position: fixed;
    top: ${props.open ? '50%' : '100%'};
    bottom: initial;
    left: 0;
    width: 100%;
    
    color: ${props.theme.palette.background.text};
    background-color: ${props.theme.palette.background.main};
    z-index: ${props.theme.zIndex.modal};
    opacity: ${props.open ? '1' : '0'};

    transform: translateY(-50%);

    ${props.css || ''}
  `}
`;

const Modal: NextPage<ComponentProps> = ({
  children,
  className,
  css,
  open,
  palette,
  onClickBackdrop
}) => {
  const [cssActive, setCSSActive] = useState(false);
  const transitionTimeout = 0.5;
  return (
    <DOMToggleProvider
      active={open}
      setCSSActive={setCSSActive}
      transitionTimeout={transitionTimeout}
    >
      <Backdrop
        open={cssActive}
        onClick={onClickBackdrop}
        transitionTimeout={transitionTimeout}
      />
      <StyledModalDiv
        className={className}
        css={css}
        open={cssActive}
        palette={palette}
        transitionTimeout={transitionTimeout}
      >
        {children}
      </StyledModalDiv>
    </DOMToggleProvider>
  );
}

export default Modal;
