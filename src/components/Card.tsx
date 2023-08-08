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
        'bg-white',
        'rounded-3xl',
        'border-2', 'border-slate-100',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  title?: string
  titleIcon?: IconDefinition
  onClickTitleIcon?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export function CardHeader({
  title = '',
  titleIcon,
  onClickTitleIcon,
  className = '',
}: CardHeaderProps) {
  return (
    <div
      className={[
        'flex', 'items-center',
        'px-4', 'py-3',
        'bg-white',
        'rounded-3xl',
        'text-lg',
      ].join(' ')}
    >
      {titleIcon && (
        <button onClick={onClickTitleIcon}>
          <FontAwesomeIcon
            className={[
              'h-5', 'w-5',
              'mr-3',
              'text-lg',
            ].join(' ')}
            icon={titleIcon}
          />
        </button>
      )}
      <div>{title}</div>
    </div>
  );
}
