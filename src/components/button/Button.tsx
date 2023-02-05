import { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';

interface ButtonProps {
  fullWidth?: boolean;
}
const Button = styled.button<ButtonProps>`
  border: none;
  padding: 16px 24px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  ${props => (props.fullWidth ? `
    display: block;
    width: 100%;
  ` : '')}
`;

interface Props {
  children: ReactNode | string;
  fullWidth?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export default (props: Props) => {
  const {
    children,
    fullWidth,
    onClick
  } = props;
 
  return (
    <Button
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
