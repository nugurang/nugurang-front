import { MouseEventHandler, ReactNode } from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
  children: ReactNode | string;
  fullWidth?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default (props: ButtonProps) => {
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
