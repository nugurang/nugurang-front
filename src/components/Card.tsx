import { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({
  children,
}: CardProps) {
  return (
    <div
      className={[
        'bg-white', 'dark:bg-black', 
        'rounded-3xl',
        'border-2', 'border-slate-100', 'dark:border-slate-900',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  title?: string
  icon?: IconDefinition
  onClickIcon?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export function CardHeader({
  title = '',
  icon,
  onClickIcon,
  className = '',
}: CardHeaderProps) {
  return (
    <div
      className={[
        'flex', 'items-center',
        'px-4', 'py-3',
        'bg-white', 'dark:bg-black', 
        'rounded-3xl',
        'text-lg',
      ].join(' ')}
    >
      {icon && (
        <button onClick={onClickIcon}>
          <FontAwesomeIcon
            className={[
              'h-5', 'w-5',
              'mr-3',
              'text-lg',
            ].join(' ')}
            icon={icon}
          />
        </button>
      )}
      <div>{title}</div>
    </div>
  );
}
