import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Backdrop from '@/src/components/Backdrop';
import DOMToggleProvider from '@/src/components/DOMToggleProvider';
import type { NextPage } from 'next';
import React from 'react';
import { fontFamily } from '@/src/styles/preset';
import { hexToRGB } from '@/src/utils/color';
import styled from '@emotion/styled';
import { useState } from 'react';

interface CssProps {
  css?: string;
  open: boolean;
  palette?: PaletteKey;
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

const StyledBackdrop = styled(Backdrop)<StyledWrapProps>`
  ${(props: any) => `
    transition: all ${props.transitionTimeout}s cubic-bezier(0.22, 1, 0.36, 1);
    -webkit-transition: all ${props.transitionTimeout}s cubic-bezier(0.22, 1, 0.36, 1);
  `}
`;

const StyledModalDiv = styled.div<StyledWrapProps>`
  ${(props: any) => `
    position: fixed;
    top: ${props.open ? '50%' : '100%'};
    bottom: initial;
    left: 0;
    width: 100%;
    color: ${props.theme.palette.background.text};
    background-color: ${props.theme.palette.background.main};
    z-index: 510;
    opacity: ${props.open ? '1' : '0'};
    transform: translateY(-50%);
    transition: all ${props.transitionTimeout}s cubic-bezier(0.22, 1, 0.36, 1);
    -webkit-transition: all ${props.transitionTimeout}s cubic-bezier(0.22, 1, 0.36, 1);
    ${fontFamily}
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
      <StyledBackdrop
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
