import { MouseEventHandler, ReactNode, useContext } from 'react';
import styled from '@emotion/styled';
import React from 'react';
import { Theme, ThemeContext } from '../theme';
import Backdrop from './Backdrop';

interface ModalProps {
  theme: Theme;
  open: boolean;
}
const Modal = styled.div<ModalProps>`
  ${props => (`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform : translateY(${props.open ? '0' : '100%'});
    transition: transform 500ms;
    pointer-events: none;

    @media (max-width: 768px) {
      justify-content: flex-end;
    }
    @media (min-width: 768px) {
      justify-content: center;
    }

    z-index: ${props.theme.zIndex.modal};
  `)}
`;

interface ModalInnerWrapProps {
  minHeight?: string;
  minWidth?: string;
  maxHeight?: string;
  maxWidth?: string;
}
const ModalInnerWrap = styled.div<ModalInnerWrapProps>`
  ${props => (`
    ${props.minHeight ? `min-height: ${props.minHeight}` : ''}
    ${props.minWidth ? `min-width: ${props.minWidth}` : ''}
    ${props.maxHeight ? `max-height: ${props.maxHeight}` : ''}
    ${props.maxWidth ? `max-width: ${props.maxWidth}` : ''}
    pointer-events: initial;
  `)}
`;

interface Props {
  children: ReactNode | string;
  dimmed?: boolean;
  minHeight?: string;
  minWidth?: string;
  maxHeight?: string;
  maxWidth?: string;
  open: boolean;
  onClickBackdrop?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    children,
    dimmed,
    minHeight,
    minWidth,
    maxHeight,
    maxWidth,
    open,
    onClickBackdrop,
  } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Backdrop dimmed={dimmed} open={open} onClick={onClickBackdrop}/>
      <Modal
        theme={theme}
        open={open}
      >
        <ModalInnerWrap
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          minHeight={minHeight}
          minWidth={minWidth}
        >
          {children}
        </ModalInnerWrap>
      </Modal>
    </>
  );
}
