import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import Backdrop from '@/src/components/Backdrop';
import DOMToggleProvider from '@/src/components/DOMToggleProvider';
import type { NextPage } from 'next';
import React from 'react';
import { hexToRGB } from '@/src/utils/color';
import styled from '@emotion/styled';
import { useState } from 'react';

interface CssProps {
  acrylic?: boolean;
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
    top: ${props.open ? 'initial' : '100%'};
    bottom: ${props.open ? '0' : 'initial'};
    left: 0;
    width: 100%;
    color: ${props.theme.palette.background.text};
    background-color: ${props.theme.palette.background.main};
    z-index: 510;
    opacity: ${props.open ? '1' : '0'};
    transition: all ${props.transitionTimeout}s cubic-bezier(0.22, 1, 0.36, 1);
    -webkit-transition: all ${props.transitionTimeout}s cubic-bezier(0.22, 1, 0.36, 1);
    ${props.theme.screenSizeMediaQuery.gteTablet} {
      top: ${props.open ? '50%' : '100%'};
      bottom: initial;
      transform: translateY(-50%);
    }
    ${props.acrylic ? `
      background-color: ${hexToRGB(props.theme.palette[props.palette || 'background'].main, 0.75)};
      @supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
        background-color: ${hexToRGB(props.theme.palette[props.palette || 'background'].main, 0.75)};
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }
    ` : ''}
    ${props.css || ''}
  `}
`;

const Modal: NextPage<ComponentProps> = ({
  acrylic,
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
        acrylic={acrylic}
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
