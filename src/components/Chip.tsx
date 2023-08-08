'use client';

import {
  ChangeEvent
} from 'react';

export interface ChipProps {
  label: string
  checked?: boolean
  onChange?: ChangeEvent<HTMLInputElement>
  className?: string
}

export default function Chip({
  label,
  checked,
  onChange,
  className = '',
}: ChipProps) {
  return (
    <label
      className={[
        'h-8', 'px-4',
        'bg-white', 'border-2', 'rounded-3xl',
        'text-slate-500', 'border-slate-400', 'hover:bg-slate-50',
        checked ? 'checked:text-slate-100' : '',
        checked ? 'checked:bg-purple-400': '',
        'cursor-pointer',
        className,
      ].join(' ')}
    >
      <input
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
