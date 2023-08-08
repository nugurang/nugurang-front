'use client';

import {
  MouseEventHandler
} from "react";

export interface ButtonProps {
  label: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function Button({
  label,
  onClick = () => {},
  className = '',
}: ButtonProps) {
  return (
    <div>
      <button
      className={[
        'h-8', 'w-full',
        'px-4',
        'rounded-2xl',
        'hover:text-slate-100', 'hover:bg-purple-400',
        className,
      ].join(' ')}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export interface ButtonBaseProps {
  children: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export function ButtonBase({
  children,
  onClick = () => {},
  className = '',
}: ButtonBaseProps) {
  return (
    <div>
      <button
      className={[
        'h-8', 'w-full',
        'px-4',
        'rounded-2xl',
        'hover:text-slate-100', 'hover:bg-purple-400',
        className,
      ].join(' ')}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
