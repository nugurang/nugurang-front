import { MouseEventHandler } from "react";
import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import type { FontAwesomeIconProps } from '@/components/FontAwesomeIcon';

export interface VerticalListProps {
  children: React.ReactNode
  className?: string
}

export default function VerticalList({
  children,
  className = '',
}: VerticalListProps) {
  return (
    <ol
      className={[
        'bg-white', 'dark:bg-black',
        'rounded-3xl',
        'divide-y', 'divide-neutral-200', 'dark:divide-neutral-800', 'divide-dashed',
        className,
      ].join(' ')}
    >
      {children}
    </ol>
  );
}

export interface VerticalListItemProps {
  children: React.ReactNode
  icon?: FontAwesomeIconProps
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export function VerticalListItem({
  children,
  icon,
  onClick,
  className = '',
}: VerticalListItemProps) {
  return (
    <li
      className={[
        'py-2',
        className,
      ].join(' ')}
    >
      <div
        className={[
          'px-4', 'py-2',
          'bg-white', 'dark:bg-black', 'hover:bg-neutral-50', 'dark:hover:bg-neutral-950',
          // 'odd:bg-white', 'even:bg-neutral-50',
          'rounded-3xl',
        ].join(' ')}
      >
        <button
          className={[
            'flex', 'justify-start', 'items-start',
            'w-full',
            'rounded-3xl',
          ].join(' ')}
          onClick={onClick}
        >
          {icon && (
            <FontAwesomeIcon
              className={[
                'h-5', 'w-5',
                'mt-1', 'mr-3',
              ].join(' ')}
              icon={icon.icon}
              palette={icon.palette}
            />
          )}
          <div
            className={[
              'flex', 'flex-col', 'justify-start', 'items-start',
              'grow',
            ].join(' ')}
          >
            {children}
          </div>
        </button>
      </div>
    </li>
  );
}

export interface VerticalListItemTextProps {
  title?: string
  subtitle?: string
}

export function VerticalListItemText({
  title = '',
  subtitle = '',
}: VerticalListItemTextProps) {
  return (
    <>
      <div className={[
        'text-left',
        'break-all',
      ].join(' ')}>{title}</div>
        <div className={[
        'text-left', 'text-sm',
        'break-all',
      ].join(' ')}>{subtitle}</div>
    </>
  );
}
