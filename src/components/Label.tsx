'use client';

import {
  MouseEventHandler
} from "react";

export interface LabelProps {
  children: React.ReactNode;
  id: string;
  label: string;
  isRequired?: boolean;
  onClick?: MouseEventHandler<HTMLLabelElement>;
  className?: string;
}

export default function Label({
  children,
  id,
  label = '',
  isRequired = false,
  onClick = () => {},
  className = '',
}: LabelProps) {
  return (
    <>
      <div>
        <label
          htmlFor={id}
          className={[
            'inline-block', 'pl-2', 'py-2',
            isRequired ? [
              'before:block', 'before:absolute', 'before:top-4', 'before:left-2',
              'before:content-[\'\']',
              'before:h-[0.375rem]', 'before:w-[0.375rem]',
              'before:bg-red-500',
              'before:rounded-3xl',
            ].join(' ') : '',
            className,
          ].join(' ')}
          onClick={onClick}
        >
          {label}
        </label>
        {children}
      </div>
    </>
  );
}
