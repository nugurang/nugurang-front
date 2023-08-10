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
          'h-6', 'w-12',
          'rounded-full',
          (checked ? 'bg-purple-400' : 'bg-neutral-400')
        ].join(' ')}>
          <div className={[
            'flex', 'items-center', 'justify-start',
          ].join(' ')}>
            <div className={[
              'mt-1', (checked ? 'ml-7' : 'ml-1'),
              'h-4', 'w-4',
              'dot', 'rounded-full',
              'bg-white',
              'transition-all'
            ].join(' ')}>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
}
