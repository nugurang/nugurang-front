'use client';

import {
  FormEventHandler,
  HTMLInputTypeAttribute,
  MouseEventHandler
} from "react";

export interface TextfieldProps {
  type?: HTMLInputTypeAttribute,
  placeholder?: string,
  onClick?: MouseEventHandler<HTMLInputElement>
  onInput?: FormEventHandler<HTMLInputElement>
  className?: string
}

export default function Textfield({
  type = 'text',
  placeholder = '',
  onClick = () => {},
  onInput = () => {},
  className = '',
}: TextfieldProps) {
  return (
    <div>
      <input
      className={[
        'h-8', 'w-full',
        'px-4',
        'text-sm',
        'rounded-2xl',
        'bg-white',
        'border-2', 'border-slate-200',
        'focus:outline-none', 'focus:ring-0', 'focus:border-purple-400'
      ].join(' ')}
        type={type}
        placeholder={placeholder}
        onClick={onClick}
        onInput={onInput}
      ></input>
    </div>
  );
}
