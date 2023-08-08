'use client';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import Box from "@/components/Box";
import Button from '@/components/Button';
import Card, { CardHeader } from "@/components/Card";
import VerticalList, { VerticalListItem } from "@/components/VerticalList";

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
  titleIcon?: IconDefinition
  itemCount?: number,
  marginTop?: boolean,
}

export function DummyVerticalListCard({
  title = '',
  titleIcon,
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
        {(title || titleIcon) && (
          <CardHeader
            title={title}
            titleIcon={titleIcon}
          />
        )}
        <VerticalList className={[
          'grow'
        ].join(' ')}>
          {Array(itemCount).fill(true).map((_, index) => (
            <VerticalListItem
              key={index}
              title='Lorem Ipsum'
              titleIcon={titleIcon}
            >
            Hello World
          </VerticalListItem>
          ))}
        </VerticalList>
        <div className='p-2'>
          <Button label='More' />
        </div>
      </Box>
    </Card>
  );
}
