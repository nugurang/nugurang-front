import { MouseEventHandler, ReactElement } from 'react';

import Button, { HorizontalButtonGroup } from '@/components/Button';
import type { ButtonPaletteProps } from '@/components/Button';
import FontAwesomeIcon from "@/components/FontAwesomeIcon";
import type { FontAwesomeIconProps } from '@/components/FontAwesomeIcon';
import FontAwesomeIconButton from "@/components/FontAwesomeIconButton";
import type { FontAwesomeIconButtonProps } from '@/components/FontAwesomeIconButton';

import {
  faXmark
} from "@fortawesome/free-solid-svg-icons";

export interface DialogButtonProps {
  label: string
  palette?: ButtonPaletteProps
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export interface DialogProps {
  children?: ReactElement
  icon?: FontAwesomeIconButtonProps
  title?: string
  subtitle?: String
  bottomButtonList?: DialogButtonProps[]
  onClickCancel?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function Dialog({
  children,
  icon,
  title,
  subtitle,
  bottomButtonList,
  onClickCancel,
  className = '',
}: DialogProps) {
  return (
    <div className={[
      'flex', 'flex-col', 'justify-center', 'items-center',
      'min-w-[25rem]', 'max-h-[50vh]', 'max-w-[50rem]',
      'p-4',
      'rounded-3xl',
      'bg-neutral-50', 'dark:bg-neutral-950',
      'bg-opacity-75', 'backdrop-blur-md',
      className,
    ].join(' ')}>
      <div className={[
        'flex', 'justify-start', 'items-start',
        'w-full',
        'rounded-3xl',
      ].join(' ')}>
        {icon && (
          <div className={[ 'mt-1 '].join(' ')}>
            <FontAwesomeIcon
              icon={icon.icon}
              palette={icon.palette}
            />
          </div>
        )}
        <div className={[
          'mt-2', 'ml-2',
          'grow',
        ].join(' ')}>
          {title && (
          <div className={[
            'font-bold',
          ].join(' ')}>
            {title}
          </div>
          )}
          {subtitle && (
          <div className={[
            'text-sm',
          ].join(' ')}>
            {subtitle}
          </div>
          )}
        </div>
        {onClickCancel && (
          <div className={[ 'mt-1 '].join(' ')}>
            <FontAwesomeIconButton
              icon={faXmark}
              variant='text'
              onClick={onClickCancel}
            />
          </div>
        )}
      </div>
      {children}
      {bottomButtonList && (
        <HorizontalButtonGroup className={[
          'mt-4',
        ].join(' ')}>
          {bottomButtonList.map((button, index) => (
            <Button
              key={index}
              label={button.label}
              palette={button.palette}
              onClick={button.onClick}
            />
          ))}
        </HorizontalButtonGroup>
      )}
    </div>
  );
}
