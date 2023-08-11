'use client';

import {
  MouseEventHandler
} from "react";

export interface LogoProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function Logo({
  onClick = () => {},
  className = '',
}: LogoProps) {
  return (
    <button
    className={[
      'flex', 'justify-center', 'items-center',
      'px-2',
      'rounded-3xl',
      className,
    ].join(' ')}
      onClick={onClick}
    >
      <span className='block sm:hidden px-2 text-lg'>nά</span>
      <span className='hidden sm:block px-2 text-lg'>nugurang άλφα</span>
    </button>
  );
}
