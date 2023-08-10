'use client';

import { MouseEventHandler } from 'react';
import { FontAwesomeIcon as ImportedFontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type FontAwesomeIconButtonPaletteProps = 'primary' | 'error' | 'default'
export interface FontAwesomeIconButtonProps {
  icon: IconDefinition
  label?: string
  palette?: FontAwesomeIconButtonPaletteProps
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function FontAwesomeIconButton({
  icon,
  label,
  palette = 'default',
  onClick,
  className = '',
}: FontAwesomeIconButtonProps) {
  return (
    <div>
      <button
        className={[
          'h-10', (label ? '' : 'w-10'),
          (label ? 'px-4' : ''),
          'rounded-3xl',
          (() => {
            switch(palette) {
              case 'primary':
                return [
                  'text-neutral-50', 'bg-purple-400', 'border-2', 'border-purple-400',
                  'hover:bg-purple-600', 'hover:border-purple-600',
                ].join(' ')
              case 'error':
                return [
                  'text-neutral-50', 'bg-red-400', 'border-2', 'border-red-400',
                  'hover:bg-red-600', 'hover:border-red-600',
                ].join(' ')
              case 'default':
              default:
                return [
                  'bg-neutral-50', 'dark:bg-neutral-950', 'border-2', 'border-neutral-50', 'dark:border-neutral-950',
                  'hover:bg-neutral-200', 'dark:hover:bg-neutral-800', 'hover:border-neutral-200', 'dark:hover:border-neutral-800',
                ].join(' ')
            }
          })(),
        ].join(' ')}
        onClick={onClick}
      >
        <div
          className={[
            'flex', 'justify-center', 'items-center', 'gap-2',
          ].join(' ')}
        >
          <ImportedFontAwesomeIcon
            className={[
              'h-4', 'w-4',
            ].join(' ')}
            icon={icon}
          />
          {label && (
            <span>{label}</span>
          )}
        </div>
      </button>
    </div>
  );
}
