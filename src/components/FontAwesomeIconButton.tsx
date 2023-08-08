'use client';

import { MouseEventHandler } from 'react';
import { FontAwesomeIcon as ImportedFontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface FontAwesomeIconButtonProps {
  icon: IconDefinition
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function FontAwesomeIconButton({
  icon,
  onClick,
  className = '',
}: FontAwesomeIconButtonProps) {
  return (
    <div>
      <button
        className={[
          'h-8', 'w-8',
          'rounded-2xl',
          'hover:text-slate-100', 'hover:bg-purple-400',
        ].join(' ')}
        onClick={onClick}
      >
        <ImportedFontAwesomeIcon
          className={[
            'h-4', 'w-4',
          ].join(' ')}
          icon={icon}
        />
      </button>
    </div>
  );
}
