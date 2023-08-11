import { FontAwesomeIcon as ImportedFontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type FontAwesomeIconPaletteProps = 'primary' | 'error' | 'default'
export interface FontAwesomeIconProps {
  icon: IconDefinition
  dense?: boolean
  palette?: FontAwesomeIconPaletteProps
  className?: string
}

export default function FontAwesomeIcon({
  icon,
  dense = false,
  palette = 'default',
  className = '',
}: FontAwesomeIconProps) {
  return (
    <div
      className={[
        'flex', 'justify-center', 'items-center',
        'rounded-3xl',
        ((dense && (true)) ? '' : 'p-2'),
        (() => {
          switch(`${palette}`) {
            case `primary`:
              return [
                'text-purple-600', 'dark:text-purple-400',
              ].join(' ')
            case `error`:
              return [
                'text-red-600', 'dark:text-red-400',
              ].join(' ')
            case `default`:
            default:
              return [
                'text-neutral-900', 'dark:text-neutral-100',
              ].join(' ')
          }
        })(),
        className,
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
