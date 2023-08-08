'use client'

import { ButtonBase } from '@/components/Button';
import { ThreadThumbnailCard } from '@/compositions/ThreadThumbnailCard';

import {
  faSearch
} from "@fortawesome/free-solid-svg-icons";

const mockThreadThumbnailCardList = [
  {
    title: '마천루 제목',
    content: '마천루 컨텐츠',
    icon: faSearch,
    imageSrc: 'https://source.unsplash.com/random/?skyscraper',
    onClickThumbnail: () => alert('마천루 썸네일'),
    onClickBody: () => alert('마천루 본문'),
  },
  {
    title: '프로그래밍 제목',
    content: '프로그래밍 컨텐츠',
    icon: faSearch,
    imageSrc: 'https://source.unsplash.com/random/?programming',
    onClickThumbnail: () => alert('프로그래밍 썸네일'),
    onClickBody: () => alert('프로그래밍 본문'),
  },
  {
    title: '고양이 제목',
    content: '고양이 컨텐츠',
    icon: faSearch,
    imageSrc: 'https://source.unsplash.com/random/?cat',
    onClickThumbnail: () => alert('고양이 썸네일'),
    onClickBody: () => alert('고양이 본문'),
  },
]

export default function SearchBarFragment() {
  return (
    <div className={[
      'flex', 'flex-col', 'gap-4'
    ].join(' ')}>
      {mockThreadThumbnailCardList.map((threadThumbnailCard, index) => (
        <ThreadThumbnailCard
          key={index}
          title={threadThumbnailCard.title}
          content={threadThumbnailCard.content}
          icon={threadThumbnailCard.icon}
          imageSrc={threadThumbnailCard.imageSrc}
          onClickThumbnail={threadThumbnailCard.onClickThumbnail}
          onClickBody={threadThumbnailCard.onClickBody}
        />
      ))}
    </div>
  );
}
