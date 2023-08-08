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

export function ThreadThumbnailCard({
  title = '',
  content = '',
  imageSrc = '',
  onClickThumbnail,
  onClickBody,
}: ThreadThumbnailCardProps) {
  return (
    <Card>
      <img
        className={[
          'max-h-60', 'sm:max-h-72', 'w-full',
          'object-cover',
          'rounded-tl-2xl', 'rounded-tr-2xl',
        ].join(' ')}
        src={imageSrc}
        alt=''
        onClick={onClickThumbnail}
      />
      <div
        className={[
          'p-6'
        ].join(' ')}
        onClick={onClickBody}
      >
        <div
          className={[
            'flex',
          ].join(' ')}
        >
          <div
            className={[
              'grow',
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
            />
          </div>
        </div>
        <div>
          {content}
        </div>
      </div>
    </Card>
  );
}
