import { MouseEventHandler, ReactNode } from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
  children: ReactNode | string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default (props: ButtonProps) => {
  const {
    children,
    onClick
  } = props;
 
  return (
    <Button
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
