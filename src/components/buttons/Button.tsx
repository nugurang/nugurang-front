'use client';

import { MouseEventHandler } from 'react';
 
interface ButtonProps {
  children: JSX.Element | string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default (props: ButtonProps) => {
  const {
    children,
    onClick
  } = props;
 
  return (
    <div>
      <button onClick={onClick}>{children}</button>
    </div>
  );
}
