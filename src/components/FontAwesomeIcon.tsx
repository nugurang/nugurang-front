import { FontAwesomeIcon as ImportedFontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface FontAwesomeIconProps {
  icon: IconDefinition
  className?: string
}

export default function FontAwesomeIcon({
  icon,
  className = '',
}: FontAwesomeIconProps) {
  return (
    <div
      className={[
        'h-8', 'w-8',
        'rounded-2xl',
      ].join(' ')}
    >
      <ImportedFontAwesomeIcon
        className={[
          'h-4', 'w-4',
        ].join(' ')}
        icon={icon}
      />
    </div>
  );
}
