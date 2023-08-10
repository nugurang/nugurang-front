'use client';

import { MouseEventHandler } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import Box from "@/components/Box";
import Button from '@/components/Button';
import Card, { CardHeader } from "@/components/Card";
import VerticalList, { VerticalListItem } from "@/components/VerticalList";
import FontAwesomeIconButton from '@/components/FontAwesomeIconButton';

import {
  faHeart as faHeartRegular
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid
} from "@fortawesome/free-solid-svg-icons";


export interface ThreadThumbnailCardProps {
  title?: string
  content?: string
  icon?: IconDefinition
  imageSrc?: string
  onClickThumbnail?: MouseEventHandler<HTMLImageElement>
  onClickBody?: MouseEventHandler<HTMLDivElement>
}

export default function ThreadThumbnailCard({
  title = '',
  content = '',
  imageSrc = undefined,
  onClickThumbnail,
}: ThreadThumbnailCardProps) {
  return (
    <Card>
      <img
        className={[
          'h-60', 'sm:h-72', 'w-full',
          'object-cover',
          'rounded-tl-2xl', 'rounded-tr-2xl',
        ].join(' ')}
        src={imageSrc}
        alt=''
        onClick={onClickThumbnail}
      />
      <Box
        extraPadding={true}
      >
        <div
          className={[
            'flex',
          ].join(' ')}
        >
          <div
            className={[
              'grow',
              'mt-1',
              'text-lg', 'font-bold', 'truncate'
            ].join(' ')}
          >
            {title}
          </div>
          <div
            className={[
              'flex',
            ].join(' ')}
          >
            <FontAwesomeIconButton
              icon={faHeartRegular}
              label='100'
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          </div>
        </div>
        <div
          className={[
            'mt-1',
          ].join(' ')}
        >
          {content}
        </div>
        <div
          className={[
            'mt-4'
          ].join(' ')}
        >
          <Button label={'더 알아보기'}/>
        </div>
      </Box>
    </Card>
  );
}
