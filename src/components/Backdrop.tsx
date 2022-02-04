import Button from '@/src/components/base/Button';
import type { NextPage } from 'next'
import type { ThemeObject } from '@/src/components/BaseComponent';
import styled from '@emotion/styled';

interface CssProps {
  css?: string;
  onClick?: (() => void) | undefined;
  open: boolean;
  transitionTimeout: number;
}

interface ComponentProps extends CssProps {
  className?: string;
}

interface StyledProps extends CssProps {
  theme: ThemeObject;
}

const StyledButton = styled(Button)<StyledProps>`
  ${(props: StyledProps) => `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: #000;
    opacity: ${props.open ? '0.5' : '0'};
    &:active {
      opacity: ${props.open ? '0.6' : '0'};
      transform: none;
    }
    z-index: ${props.theme.zIndex.backdrop};
  `}
`;

const Modal: NextPage<ComponentProps> = ({
  className,
  open,
  onClick,
  transitionTimeout
}) => {
  return (
    <StyledButton
      className={className}
      open={open}
      onClick={() => {open && onClick && onClick()}}
      transitionTimeout={transitionTimeout}
    />
  );
}

export default Modal;
