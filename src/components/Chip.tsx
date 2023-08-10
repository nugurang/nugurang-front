'use client';

import {
  ChangeEventHandler
} from 'react';

export interface ChipProps {
  id: string
  label: string
  checked?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  className?: string
}

export default function Chip({
  id,
  label,
  checked,
  onChange,
  className = '',
}: ChipProps) {
  return (
    <label
      htmlFor={id}
      className={[
        'h-8', 'px-4',
        'bg-white', 'dark:bg-black', 'border-2', 'rounded-3xl',
        'text-neutral-500', 'dark:text-neutral-500', 'border-neutral-400', 'dark:border-neutral-600', 'hover:bg-neutral-50', 'dark:hover:bg-neutral-950', 
        checked ? 'checked:text-neutral-100' : '',
        checked ? 'checked:bg-purple-400': '',
        'cursor-pointer',
        className,
      ].join(' ')}
    >
      <input
        id={id}
        type='checkbox'
        className="sr-only peer"
        onChange={onChange}
      />
      <div className={[
        'h-8',
        'pb-1',
        'flex', 'items-center',
        className,
      ].join(' ')}>
        <span>{label}</span>
      </div>
    </label >
  );
}

export interface ChipGroupProps {
  children: React.ReactNode
  className?: string
}

export function ChipGroup({
  children,
  className = '',
}: ChipGroupProps) {
  return (
    <div
      className={[
        'flex', 'items-center', 'gap-2',
        'flex-wrap',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
