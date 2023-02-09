import { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';

interface ButtonBaseProps {
  fullWidth?: boolean;
}
const ButtonBase = styled.button<ButtonBaseProps>`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;

  color: inherit;
  font: inherit;

  line-height: normal;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  -webkit-appearance: none;
  cursor: pointer;
  
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  ${props => (props.fullWidth ? `
    display: block;
    width: 100%;
    text-align: left;
  ` : '')}
`;

interface Props {
  children: ReactNode | string;
  fullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    children,
    fullWidth,
    onClick
  } = props;
 
  return (
    <ButtonBase
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </ButtonBase>
  );
}
