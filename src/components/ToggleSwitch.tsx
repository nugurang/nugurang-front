'use client';

import {
  ChangeEventHandler
} from 'react';

export interface ToggleSwitchProps {
  id: string
  checked: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  className?: string
}

export default function ToggleSwitch({
  id,
  checked,
  onChange = () => {},
  className = '',
}: ToggleSwitchProps) {
  return (
    <label
      htmlFor={id}
      className={[
      'flex', 'cursor-pointer', 'select-none', 'items-center',
      className,
    ].join(' ')}>
      <div className='relative'>
        <input
          type='checkbox'
          id={id}
          className='sr-only'
          checked={checked}
          onChange={onChange}
        />
        <div className={[
          'block',
          'h-6', 'w-10',
          'rounded-full',
          (checked ? 'bg-purple-400' : 'bg-slate-400')
        ].join(' ')}></div>
        <div className={[
          'flex', 'items-center', 'justify-center',
          'absolute', 'top-1', (checked ? 'right-1' : 'left-1'),
          'h-4', 'w-4',
          'dot', 'rounded-full',
          'bg-white',
          'transition'
        ].join(' ')}>
        </div>
      </div>
    </label>
  );
}
