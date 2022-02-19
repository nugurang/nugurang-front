import type { CommonComponentProps, VariantKeys } from '@/components/common';

import Button from '@/components/atoms/button/Button';
import Card from '@/components/atoms/card/Card';
import DOMToggleProvider from '@/components/atoms/domToggleProvider/DOMToggleProvider';
import React from 'react';
import styled from '@emotion/styled';

interface ViewProps extends CommonComponentProps {
  cssActive: boolean;
  setCSSActive: (cssActive: boolean) => void;
  onClickBackdrop: (() => void) | undefined;
}

interface BackdropButtonProps extends CommonComponentProps {
  cssActive: boolean;
}

interface ModalCardProps extends CommonComponentProps {
  cssActive: boolean;
  transitionTimeout: number;
}

const StyledBackdropButton = styled(Button)<BackdropButtonProps>`
  ${(props: any) => `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: #000;
    opacity: ${props.cssActive ? '0.5' : '0'};
    &:active {
      opacity: ${props.cssActive ? '0.6' : '0'};
      transform: none;
    }
    z-index: ${props.theme.zIndex.backdrop};
  `}
`;

const StyledModalCard = styled(Card)<ModalCardProps>`
  ${(props: any) => `
    position: fixed;
    top: ${props.cssActive ? '50%' : '100%'};
    bottom: initial;
    left: 0;
    width: 100%;
    transform: translateY(-50%);

    border-radius: 0;
    background-color: ${props.theme.palette[props.palette || 'default'].low};

    opacity: ${props.cssActive ? '1' : '0'};
    z-index: ${props.theme.zIndex.modal};
    
    ${props.css || ''}
  `}
`;

const ModalView: React.FC<ViewProps> = props => {
  const transitionTimeout = 0.5;

  const domToggleProviderProps = {
    enable: props.enable,
    cssActive: props.cssActive,
    setCSSActive: props.setCSSActive,
    transitionTimeout
  }

  const backdropButtonProps = {
    className: props.className,
    cssActive: props.cssActive,
    variant: 'transparent' as VariantKeys,
    onClick: props.onClickBackdrop
  }

  const modalCardProps = {
    className: props.className,
    css: props.css,
    cssActive: props.cssActive,
    palette: props.palette ? props.palette : 'background',
    transitionTimeout
  }

  return (
    <DOMToggleProvider {...domToggleProviderProps} >
      <StyledBackdropButton {...backdropButtonProps} />
      <StyledModalCard {...modalCardProps} >
        {props.children}
      </StyledModalCard>
    </DOMToggleProvider>
  );
}

export default ModalView;
