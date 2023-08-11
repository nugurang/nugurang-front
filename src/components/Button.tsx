'use client';

import {
  MouseEventHandler
} from "react";

export type ButtonPaletteProps = 'primary' | 'error' | 'default'
export type ButtonVariantProps = 'contained' | 'text'
export interface ButtonProps {
  label: string
  palette?: ButtonPaletteProps
  variant?: ButtonVariantProps
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function Button({
  label,
  palette = 'default',
  variant = 'contained',
  onClick = () => {},
  className = '',
}: ButtonProps) {
  return (
    <button
    className={[
      'h-10', 'w-full',
      'px-4',
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
      {label}
    </button>
  );
}

export interface HorizontalButtonGroupProps {
  children: React.ReactNode
  marginTop?: boolean
  className?: string
}

export function HorizontalButtonGroup({
  children,
  marginTop = false,
  className = '',
}: HorizontalButtonGroupProps) {
  return (
    <div className={[
      'flex', 'gap-2',
      marginTop ? 'mt-4' : '',
      'w-full',
      '[&>*]:grow',
      className,
    ].join(' ')}>
      {children}
    </div>
  );
}

export interface ButtonBaseProps {
  children: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export function ButtonBase({
  children,
  onClick = () => {},
  className = '',
}: ButtonBaseProps) {
  return (
    <div>
      <button
      className={[
        'h-10', 'w-full',
        'px-4',
        'rounded-3xl',
        'hover:bg-neutral-200', 'dark:hover:bg-neutral-800', 'hover:border-neutral-200', 'dark:hover:border-neutral-800',
        className,
      ].join(' ')}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
