'use client';

import {
  FormEventHandler,
  MouseEventHandler
} from "react";

export interface TextfieldProps {
  placeholder?: string,
  onClick?: MouseEventHandler<HTMLDivElement>
  onInput?: FormEventHandler<HTMLDivElement>
  className?: string
}

export default function TextfieldMultiline({
  placeholder = '',
  onClick = () => {},
  onInput = () => {},
  className = '',
}: TextfieldProps) {
  return (
    <div
      contentEditable
      className={[
        'min-h-[2.5rem]', 'w-full',
        'px-4', 'py-[0.375rem]',
        'rounded-3xl',
        'bg-white', 'dark:bg-black',
        'border-2', 'border-slate-200', 'dark:border-slate-800',
        'focus:outline-none', 'focus:ring-0', 'focus:border-purple-400', 'dark:focus:border-purple-400',
        'resize-none',
        className,
      ].join(' ')}
      placeholder={placeholder}
      onClick={onClick}
      onInput={onInput}
    />
  );
}
