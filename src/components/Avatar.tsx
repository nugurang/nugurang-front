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
        'rounded-3xl',
        'border-2', 'border-slate-100',
        `${onClick ? 'hover:border-purple-400' : ''}`,
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
            `w-${size}`, `h-${size}`, 'rounded-3xl',
          ].join(' ')}
          src={src ?? ''}
        />
      </button>
    </div>
  );
}
