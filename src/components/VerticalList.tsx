import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface VerticalListProps {
  children: React.ReactNode
  className?: string
}

export default function Card({
  children,
  className = '',
}: VerticalListProps) {
  return (
    <ol
      className={[
        'bg-white',
        'rounded-2xl',
        'divide-y', 'divide-slate-200', 'divide-dashed',
        className,
      ].join(' ')}
    >
      {children}
    </ol>
  );
}

export interface VerticalListItemProps {
  children: React.ReactNode
  title?: string
  titleIcon?: IconDefinition
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export function VerticalListItem({
  children,
  title = '',
  titleIcon,
  onClick,
  className = '',
}: VerticalListItemProps) {
  return (
    <li
      className={[
        'px-4', 'py-2',
        'bg-white', 'hover:bg-slate-50',
        // 'odd:bg-white', 'even:bg-slate-50',
        'rounded-2xl',
      ].join(' ')}
    >
      <button
        className={[
          'flex', 'justify-start', 'items-start',
          'w-full',
        ].join(' ')}
        onClick={onClick}
      >
        {titleIcon && (
          <FontAwesomeIcon
            className={[
              'h-5', 'w-5',
              'mr-3', 'py-[0.1rem]',
              'text-lg',
            ].join(' ')}
            icon={titleIcon}
          />
        )}
        <div
          className={[
            'flex', 'flex-col', 'justify-start', 'items-start',
            'grow',
          ].join(' ')}
        >
          <div>{title}</div>
          <div>{children}</div>
        </div>
      </button>
    </li>
  );
}
