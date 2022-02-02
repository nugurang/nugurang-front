import type { PaletteKey, ThemeObject } from '@/src/styles/theme';

import type { NextPage } from 'next'
import styled from '@emotion/styled';

interface CssProps {
  css?: string;
  open: boolean;
  transitionTimeout: number;
}

interface ComponentProps extends CssProps {
  className?: string;
  onClick: () => void;
}

interface StyledWrapProps extends CssProps {
  theme: ThemeObject;
}

const StyledWrapButton = styled.button<StyledWrapProps>`
  ${(props: any) => `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: ${props.open ? '0.5' : '0'};
    z-index: 500;
  `}
`;

const Modal: NextPage<ComponentProps> = ({
  className,
  open,
  onClick,
  transitionTimeout
}) => {
  return (
    <StyledWrapButton
      className={className}
      open={open}
      onClick={() => {open && onClick()}}
      transitionTimeout={transitionTimeout}
    />
  );
}

export default Modal;
