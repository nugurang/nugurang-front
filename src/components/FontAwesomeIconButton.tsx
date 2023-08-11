'use client';

import { MouseEventHandler } from 'react';
import { FontAwesomeIcon as ImportedFontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type FontAwesomeIconButtonPaletteProps = 'primary' | 'error' | 'default'
export type FontAwesomeIconButtonVariantProps = 'contained' | 'text'
export interface FontAwesomeIconButtonProps {
  icon: IconDefinition
  label?: string
  dense?: boolean
  palette?: FontAwesomeIconButtonPaletteProps
  variant?: FontAwesomeIconButtonVariantProps
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function FontAwesomeIconButton({
  icon,
  label,
  dense = false,
  palette = 'default',
  variant = 'contained',
  onClick,
  className = '',
}: FontAwesomeIconButtonProps) {
  return (
    <button
      className={[
        'flex', 'justify-center', 'items-center',
        ((dense && (variant === 'text')) ? '' : 'p-2'),
        (label ? 'px-4' : ''),
        'rounded-3xl',
        (() => {
          switch(`${palette}-${variant}`) {
            case `primary-contained`:
              return [
                'text-neutral-50', 'bg-purple-400', 'border-2', 'border-purple-400',
                'hover:bg-purple-600', 'hover:border-purple-600',
              ].join(' ')
            case `primary-text`:
              return [
                'text-purple-600', 'dark:text-purple-400',
                'hover:text-purple-400', 'dark:text-purple-600',
              ].join(' ')
            case `error-contained`:
              return [
                'text-neutral-50', 'bg-red-400', 'border-2', 'border-red-400',
                'hover:bg-red-600', 'hover:border-red-600',
              ].join(' ')
            case `error-text`:
              return [
                'text-red-600', 'dark:text-red-400',
                'hover:text-red-400', 'dark:text-red-600',
              ].join(' ')
            case `default-contained`:
              return [
                'bg-neutral-50', 'dark:bg-neutral-950', 'border-2', 'border-neutral-50', 'dark:border-neutral-950',
                'hover:bg-neutral-200', 'dark:hover:bg-neutral-800', 'hover:border-neutral-200', 'dark:hover:border-neutral-800',
              ].join(' ')
            case `default-text`:
              return [
                'text-neutral-900', 'dark:text-neutral-100',
                'hover:text-neutral-500', 'dark:text-neutral-500',
              ].join(' ')
            default:
              return [
                'bg-neutral-50', 'dark:bg-neutral-950', 'border-2', 'border-neutral-50', 'dark:border-neutral-950',
                'hover:bg-neutral-200', 'dark:hover:bg-neutral-800', 'hover:border-neutral-200', 'dark:hover:border-neutral-800',
              ].join(' ')
          }
        })(),
        className,
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
  );
}
