'use client';

import {
  MouseEventHandler
} from "react";

export type ButtonPaletteProps = 'primary' | 'error' | 'default'
export interface ButtonProps {
  label: string
  palette?: ButtonPaletteProps
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function Button({
  label,
  palette = 'default',
  onClick = () => {},
  className = '',
}: ButtonProps) {
  return (
    <div>
      <button
      className={[
        'h-10', 'w-full',
        'px-4',
        'rounded-3xl',
        (() => {
          switch(palette) {
            case 'primary':
              return [
                'text-slate-50', 'bg-purple-400', 'border-2', 'border-purple-400',
                'hover:bg-purple-600', 'hover:border-purple-600',
              ].join(' ')
            case 'error':
              return [
                'text-slate-50', 'bg-red-400', 'border-2', 'border-red-400',
                'hover:bg-red-600', 'hover:border-red-600',
              ].join(' ')
            case 'default':
            default:
              return [
                'bg-slate-50', 'border-2', 'border-slate-50',
                'hover:bg-slate-200', 'hover:border-slate-200',
              ].join(' ')
          }
        })(),
        className,
      ].join(' ')}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
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
        'hover:bg-slate-200', 'hover:border-slate-200',
        className,
      ].join(' ')}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
