'use client';

import {
  FormEventHandler,
  HTMLInputTypeAttribute,
  MouseEventHandler
} from "react";

export interface TextfieldProps {
  id?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  onClick?: MouseEventHandler<HTMLInputElement>;
  onInput?: FormEventHandler<HTMLInputElement>;
  className?: string;
}

export default function Textfield({
  id = '',
  type = 'text',
  placeholder = '',
  onClick = () => {},
  onInput = () => {},
  className = '',
}: TextfieldProps) {
  return (
    <div>
      <input
        id={id}
        className={[
          'h-[2.5rem]', 'w-full',
          'px-4',
          'rounded-3xl',
          'bg-white', 'dark:bg-black',
          'border-2', 'border-neutral-200', 'dark:border-neutral-800',
          'focus:outline-none', 'focus:ring-0', 'focus:border-purple-400', 'dark:focus:border-purple-400',
        ].join(' ')}
        type={type}
        placeholder={placeholder}
        onClick={onClick}
        onInput={onInput}
      />
    </div>
  );
}
