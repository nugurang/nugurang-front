import { MouseEventHandler } from "react";
import FontAwesomeIcon from "./FontAwesomeIcon";
import type { FontAwesomeIconProps } from "./FontAwesomeIcon";

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
        'border-2', 'border-neutral-100', 'dark:border-neutral-900',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  title?: string
  icon?: FontAwesomeIconProps
  onClickIcon?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export function CardHeader({
  title = '',
  icon,
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
        className,
      ].join(' ')}
    >
      {icon && (
        <FontAwesomeIcon
          className={[
            'h-5', 'w-5',
            'mr-3',
            'text-lg',
          ].join(' ')}
          icon={icon.icon}
          palette={icon.palette}
        />
      )}
      <div>{title}</div>
    </div>
  );
}
