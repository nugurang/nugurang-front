import { MouseEventHandler } from "react";

export interface AvatarProps {
  src?: string
  size?: number
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function Avatar({
  src = '',
  size = 8,
  onClick = undefined,
  className = '',
}: AvatarProps) {
  return (
    <div
      className={[
        'rounded-full',
        'border-2', 'border-slate-100', 'dark:border-slate-900',
        `${onClick ? 'hover:border-purple-400' : ''}`, `${onClick ? 'dark:hover:border-purple-400' : ''}`,
        'shrink-0',
      ].join(' ')}
    >
      <button
          className={[
            'align-top',
          ].join(' ')}
        onClick={onClick}
      >
        <img
          className={[
            'align-top',
            `w-${size}`, `h-${size}`, 'rounded-full',
          ].join(' ')}
          src={src ?? ''}
        />
      </button>
    </div>
  );
}
