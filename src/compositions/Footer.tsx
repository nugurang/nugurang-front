'use client';

import { useRouter } from 'next/navigation'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { ButtonBase } from "@/components/Button";
import FontAwesomeIcon from "@/components/FontAwesomeIcon";

const footerNavigationItemProps = [
  {
    label: 'Board',
    icon: undefined,
    href: '/common/boards/detail',
  },
  {
    label: 'MyPage',
    icon: undefined,
    href: '/common/my',
  },
];

export interface FooterProps {
}

export default function Footer({
}: FooterProps) {
  return (
    <div className={[
      'fixed', 'bottom-0', 'left-0', 'right-0',
      'my-0',
      'bg-white',
    ].join(' ')}>
      <div className={[
        'flex', 'justify-center', 'items-center', 'gap-2',
        'relative',
        'mx-auto', 'h-16', 'max-w-screen-sm',
        'rounded-2xl'
      ].join(' ')}>
        <div className={[
          'absolute', 'top-0', 'bottom-0', 'left-0',
          'flex', 'justify-center', 'items-center', 'gap-2',
        ].join(' ')}>

        </div>
        <div className={[
          'flex', 'justify-center', 'items-center', 'gap-2',
        ].join(' ')}>
          {footerNavigationItemProps.map((navigationItem, index) => (
            <FooterNavigationItem
              key={index}
              label={navigationItem.label}
              icon={navigationItem.icon}
              href={navigationItem.href}
            />
          ))}
        </div>
        <div className={[
          'absolute', 'top-0', 'bottom-0', 'right-0',
          'flex', 'justify-center', 'items-center', 'gap-2',
        ].join(' ')}>
          
        </div>
      </div>
    </div>
  );
}

export interface FooterNavigationItemProps {
  label: string
  icon?: IconDefinition
  href?: string
}

export function FooterNavigationItem({
  label,
  icon,
  href = '/',
}: FooterNavigationItemProps) {
  const router = useRouter();

  return (
    <ButtonBase
      className={[
        'max-w-[8rem]',
        'overflow-hidden',
      ].join(' ')}
      onClick={() => router.push(href)}
    >
      {icon && (
        <FontAwesomeIcon icon={icon} />
      )}
      <div
        className={[
          'text-xs',
          'overflow-hidden', 'text-ellipsis',
        ].join(' ')}
      >{label}</div>
    </ButtonBase>
  );
}

export function FooterSpacer() {
  return (
    <div className="h-16 max-w-screen-sm">
    </div>
  );
}
