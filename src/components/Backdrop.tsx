import type { CommonComponentProps, CommonStyledProps } from '@/src/components/common';

import Button from '@/src/components/atoms/button/Button';
import styled from '@emotion/styled';

interface ComponentProps extends CommonComponentProps {
  open: boolean;
}

interface StyledComponentProps extends CommonStyledProps {
  open: boolean;
}

const StyledButton = styled(Button)<StyledComponentProps>`
  ${(props: any) => `
    display: ${props.open ? 'block' : 'none'};
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

const Backdrop: React.FC<ComponentProps> = props => {
  return (
    <StyledButton
      className={props.className}
      variant='transparent'
      open={props.open}
      onClick={() => {props.open && props.onClick && props.onClick()}}
    />
  );
}

export default Backdrop;
