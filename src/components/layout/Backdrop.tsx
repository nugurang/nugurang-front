import { MouseEventHandler, useContext } from 'react';
import styled from '@emotion/styled';
import React from 'react';
import { Theme, ThemeContext } from '../theme';

interface BackdropProps {
  theme: Theme;
  dimmed: boolean;
  open: boolean;
}
const Backdrop = styled.div<BackdropProps>`
  ${props => (`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: ${props.open ? '0.5' : '0'};
    pointer-events: none;
    transition: opacity 500ms;
    z-index: ${props.theme.zIndex.backdrop};
  `)}
`;

interface BackdropClickAreaProps {
  theme: Theme;
  open: boolean;
}
const BackdropClickArea = styled.button<BackdropClickAreaProps>`
  ${props => (`
    display: ${props.open ? 'block' : 'none'};
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: transparent;
    border: none;
    z-index: ${props.theme.zIndex.backdrop + 1};
  `)}
`;

interface Props {
  dimmed?: boolean;
  open: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    dimmed,
    open,
    onClick,
  } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Backdrop
        theme={theme}
        dimmed={dimmed ?? true}
        open={open}
      />
      <BackdropClickArea
        theme={theme}
        open={open} 
        onClick={onClick}
      />
    </>
  );
}
