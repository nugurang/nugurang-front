'use client';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import Box from "@/components/Box";
import Button from '@/components/Button';
import Card, { CardHeader } from "@/components/Card";
import type { FontAwesomeIconProps } from "@/components/FontAwesomeIcon";
import VerticalList, { TextVerticalListItem } from "@/compositions/VerticalList";

export interface DummyBannerCardProps {
  title?: string
}

export function DummyBannerCard({
  title = '',
}: DummyBannerCardProps) {
  return (
    <div className={[
      'h-64', 'w-full',
    ].join(' ')}>
      <img
        src='https://source.unsplash.com/random/?programming'
        className={[
          'h-64', 'w-full',
          'object-cover',
        ].join(' ')}
      />
    </div>
  );
}

export interface DummyVerticalListCardProps {
  title?: string
  icon?: FontAwesomeIconProps
  itemCount?: number,
  marginTop?: boolean,
}

export function DummyVerticalListCard({
  title = '',
  icon,
  itemCount = 0,
  marginTop = false,
}: DummyVerticalListCardProps) {
  return (
    <Card className={[
      marginTop ? 'mt-4' : '',
    ].join(' ')}>
      <Box className={[
        'flex', 'flex-col',
        'h-full',
      ].join(' ')}>
        {(title || icon) && (
          <CardHeader
            title={title}
            icon={icon}
          />
        )}
        <VerticalList className={[
          'grow'
        ].join(' ')}>
          {Array(itemCount).fill(true).map((_, index) => (
            <TextVerticalListItem
              key={index}
              title='Lorem Ipsum'
              subtitle='Hello World'
              icon={icon}
            />
          ))}
        </VerticalList>
        <div className='p-2'>
          <Button label='More' />
        </div>
      </Box>
    </Card>
  );
}
