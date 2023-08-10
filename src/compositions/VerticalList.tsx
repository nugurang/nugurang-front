import { ChangeEventHandler, MouseEventHandler } from 'react';

import ToggleSwitch from '@/components/ToggleSwitch';
import DelegatedVerticalList, {
  VerticalListItem as DelegatedVerticalListItem,
  VerticalListItemText as DelegatedVerticalListItemText,
} from '@/components/VerticalList';
import type {
  VerticalListItemProps as DelegatedVerticalListItemProps,
  VerticalListItemTextProps as DelegatedVerticalListItemTextProps,
} from '@/components/VerticalList';

const VerticalList = DelegatedVerticalList;
export default VerticalList;

type CoreVerticalListItemProps = Pick<
  DelegatedVerticalListItemProps, 'icon' | 'className'
>;

export interface TextVerticalListItemProps extends CoreVerticalListItemProps {
  title?: string
  subtitle?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function TextVerticalListItem({
  title = '',
  subtitle = '',
  
  icon,
  onClick,
  className = '',
}: TextVerticalListItemProps) {
  return (
    <DelegatedVerticalListItem
      icon={icon}
      onClick={onClick}
      className={className}
    >
      <div className={[
        'flex', 'flex-col', 'items-start'
      ].join(' ')}>
        <DelegatedVerticalListItemText
          title={title}
          subtitle={subtitle}
        />
      </div>
    </DelegatedVerticalListItem>
  );
}

export interface ToggleSwitchVerticalListItemProps extends CoreVerticalListItemProps {
  id: string
  checked: boolean
  title?: string
  subtitle?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function ToggleSwitchVerticalListItem({
  id,
  checked,
  title = '',
  subtitle = '',
  onChange,
  
  icon,
  className = '',
}: ToggleSwitchVerticalListItemProps) {
  return (
    <DelegatedVerticalListItem
      icon={icon}
      className={className}
    >
      <div className={[
        'flex',
        'items-start',
        'w-full',
      ].join(' ')}>
        <div className={[
          'grow',
        ].join(' ')}>
          <DelegatedVerticalListItemText
            title={title}
            subtitle={subtitle}
          />
        </div>
        <ToggleSwitch
          id={id}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </DelegatedVerticalListItem>
  );
}
